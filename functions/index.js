const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
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
};

const app = dialogflow({
  clientId,
  debug: true,
});

app.middleware(async (conv) => {
  const { email } = conv.user;
  if (!conv.data.uid && email) {
    try {
      conv.data.uid = (await auth.getUserByEmail(email)).uid;
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
    } catch (err) {
      conv.data.error = 'Unable to talk to database';
    }
  }
});

app.intent('Add Doggo', async (conv, { name, dob, tailWaggability }) => {
  if (conv.data.error) {
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

exports.dialogflowFulfilment = functions.https.onRequest(app);

exports.testFulfilment = app;
