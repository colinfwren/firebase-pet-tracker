const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const { databaseURL, testEmail } = require('./config');

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
  debug: true,
});

app.middleware(async (conv) => {
  let { email } = conv.user;
  if (process.env.NODE_ENV === 'test') {
    email = testEmail;
  }
  if (!conv.data.uid && email) {
    try {
      conv.data.uid = (await auth.getUserByEmail(email)).uid;
    } catch (e) {
      if (e.code !== 'auth/user-not-found') {
        throw e;
      }
      // If the user is not found, create a new Firebase auth user
      // using the email obtained from the Google Assistant
      conv.data.uid = (await auth.createUser({email})).uid;
    }
  }
  if (conv.data.uid) {
    conv.doggos = {
      ref: dbs.doggos.doc(conv.data.uid),
    };
  }
});

app.intent('Add Doggo', async (conv, { name, dob, tailWaggability }) => {
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
