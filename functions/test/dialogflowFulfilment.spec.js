const serviceAccount = require('../serviceAccount.json');
const { databaseUrl } = require('../config');
process.env.GCLOUD_PROJECT = serviceAccount.project_id;
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: serviceAccount.project_id,
  databaseUrl,
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});

const { testFulfilment } = require('../index');
const { addDoggoRequest } = require('./requests');
const { addDoggoResponse, errorResponse } = require('./responses');
const {
  throwOtherError,
  throwOnCreate,
  throwOnDoc,
  existingDoc,
  existingDoggoDoc,
  existingDoggoUser,
  existingNullDoggoUser,
  newUser,
} = require('./common');
const { mockDocSet } = require('../__mocks__/firebase-admin');

const newDoggo = {
  dob: '1997-03-09T12:00:00Z',
  name: 'Prince',
  tailWaggability: '10',
};

const newUserPayload = {
  doggos: [ newDoggo ],
};

const existingDoggoPayload = {
  ...existingDoggoDoc,
  ... { doggos: [ ...existingDoggoDoc.doggos, newDoggo ]},
}

describe('Add Doggo Fulfilment', () => {

  afterEach(() => {
    mockDocSet.mockReset();
  });

  it('Creates a new record if the user hasn\'t used the service before', async () => {
    const response = await testFulfilment(addDoggoRequest(newUser), {});
    expect(mockDocSet).toHaveBeenCalledWith(newUserPayload);
    expect(response.body).toEqual(expect.objectContaining(addDoggoResponse));
  });

  it('Updates an existing record if the user has used the service before', async() => {
    const response = await testFulfilment(addDoggoRequest(existingDoggoUser), {});
    expect(mockDocSet).toHaveBeenCalledWith(existingDoggoPayload);
    expect(response.body).toEqual(expect.objectContaining(addDoggoResponse));
  });

  it('Creates the doggo array if the user has no doggos', async () => {
    const response = await testFulfilment(addDoggoRequest(), {});
    expect(mockDocSet).toHaveBeenCalledWith(existingDoc);
    expect(response.body).toEqual(expect.objectContaining(addDoggoResponse));
  });

  it('Creates a new doggo array if user has deleted them all', async () => {
    const response = await testFulfilment(addDoggoRequest(existingNullDoggoUser), {});
    expect(mockDocSet).toHaveBeenCalledWith(existingDoc);
    expect(response.body).toEqual(expect.objectContaining(addDoggoResponse));
  });

  it('Throws an error if unable to get user ID', async () => {
    const response = await testFulfilment(addDoggoRequest(throwOtherError), {});
    expect(mockDocSet).not.toHaveBeenCalled();
    expect(response.body).toEqual(expect.objectContaining(errorResponse('Unable to get user ID')));
  });

  it('Throws an error if unable to create user', async () => {
    const response = await testFulfilment(addDoggoRequest(throwOnCreate), {});
    expect(mockDocSet).not.toHaveBeenCalled();
    expect(response.body).toEqual(expect.objectContaining(errorResponse('Unable to create Doggo Bot account for user')));
  });

  it('Throws an error if unable to get doc', async () => {
    const response = await testFulfilment(addDoggoRequest(throwOnDoc), {});
    expect(mockDocSet).not.toHaveBeenCalled();
    expect(response.body).toEqual(expect.objectContaining(errorResponse('Unable to talk to database')));
  });

});
