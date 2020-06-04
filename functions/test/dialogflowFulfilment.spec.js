const serviceAccount = require('../serviceAccount.json');
const { databaseUrl } = require('../config');
process.env.GCLOUD_PROJECT = serviceAccount.project_id;
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: serviceAccount.project_id,
  databaseUrl,
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});


const { testFulfilment } = require('../index');
const addDoggoRequest = require('./addDoggoRequest.json');
const { addDoggo } = require('./payloads');

describe('Add Doggo Fulfilment', () => {
  it('Adds a doggo and tells us the doggo was added', async () => {
    const response = await testFulfilment(addDoggoRequest, {});
    expect(response.body).toEqual(expect.objectContaining(addDoggo));
  });
});
