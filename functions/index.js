const functions = require('firebase-functions');
const {
  dialogflow,
  SignIn,
  Suggestions,
  UpdatePermission,
} = require('actions-on-google');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const { databaseURL, clientId } = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

const auth = admin.auth();
const db = admin.firestore();

const dbs = {
  doggos: db.collection('doggos'),
  users: db.collection('users'),
};

const app = dialogflow({
  clientId,
  debug: true,
});

const NOT_LOGGED_IN = 'User not logged in';
const PUSH_NOTIFICATION_ASKED = 'pushNotifications';

app.middleware(async (conv) => {
  const { email } = conv.user;
  if(!email) {
    conv.data.error = NOT_LOGGED_IN;
  }
  if (!conv.data.uid && email) {
    try {
      conv.data.uid = (await auth.getUserByEmail(email)).uid;
      console.log('Got user by email');
    } catch (err) {
      if (err.code !== 'auth/user-not-found') {
        conv.data.error = 'Unable to get user ID';
      }
      // If the user is not found, create a new Firebase auth user
      // using the email obtained from the Google Assistant
      try{
        conv.data.uid = (await auth.createUser({email})).uid;
      } catch (err) {
        conv.data.error = 'Unable to create Doggo Bot account for user';
      }
    }
  }
  if (conv.data.uid) {
    try {
      conv.doggos = {
        ref: dbs.doggos.doc(conv.data.uid),
      };
      conv.user.ref = dbs.users.doc(conv.data.uid);
    } catch (err) {
      conv.data.error = 'Unable to talk to database';
    }
  }
});

app.intent('Add Doggo', async (conv, { name, dob, tailWaggability }) => {
  if (conv.data.error) {
    if ( conv.data.error === NOT_LOGGED_IN){
      return conv.close(new SignIn());
    }
    return conv.close(`Doggo Bot Encountered an error: ${conv.data.error}. Please try again.`)
  }
  conv.data.name = name;
  conv.data.dob = dob;
  conv.data.tailWaggability = tailWaggability;
  const doggoObj = {
    name,
    dob,
    tailWaggability,
  };
  const doggosRef = await conv.doggos.ref.get();
  if (doggosRef.exists) {
    const data = await doggosRef.data();
    let { doggos } = data;
    if (Array.isArray(doggos)) {
      doggos.push(doggoObj);
    } else {
      doggos = [doggoObj];
    }
    await doggosRef.ref.set({ ...data,  ...{ doggos }});
  } else {
    await doggosRef.ref.set({ doggos: [doggoObj] });
  }
  return conv.close(`Added ${name} to your doggo list`);
});

app.intent('Get SignIn', async (conv, params, signin) => {
  if (signin.status === 'OK') {
    conv.ask('What can I help you with?');
  } else {
    conv.ask('Sorry, but I won\'t be able to save your data, how can I help you?');
  }
})


app.intent('Default Welcome Intent', async (conv) => {
  // Account Linking is only supported for verified users
  // https://developers.google.com/actions/assistant/guest-users
  if (conv.user.verification !== 'VERIFIED' || conv.data.error === NOT_LOGGED_IN) {
    return conv.close(new SignIn());
  }

  const {payload} = conv.user.profile;
  const name = payload ? ` ${payload.given_name}` : '';
  conv.ask(`Hi${name}!`);
  
  if (!conv.user.storage[PUSH_NOTIFICATION_ASKED]) {
    conv.ask('Would you be interested in regular conversations to keep your doggo information up to date?');
    conv.ask(new Suggestions('Send me doggo reminders'));
    conv.user.storage[PUSH_NOTIFICATION_ASKED] = true;
  } else {
    conv.ask(new Suggestions('Add New Interest'));
    conv.ask(`How can I help you today?`);
  }
});

app.intent('setup_push', async (conv) => {
  conv.ask(new UpdatePermission({
    intent: 'Add Doggo',
  }));
});

app.intent('finish_push_setup', async (conv, params) => {
  if (conv.arguments.get('PERMISSION')) {
    const updatesUserId = conv.arguments.get('UPDATES_USER_ID');
    const userData = { updatesUserId };
    const userRef = await conv.user.ref.get();
    if (userRef.exists) {
      const data = await userRef.data();
      await userRef.ref.set({ ...data, ...userData });
    } else {
      await userRef.ref.set(userData);
    }
    // Store user ID in database for later use
    conv.close(`Ok, I'll start alerting you.`);
  } else {
    conv.close(`Ok, I won't alert you.`);
  }
});



exports.dialogflowFulfilment = functions.https.onRequest(app);

exports.testFulfilment = app;
