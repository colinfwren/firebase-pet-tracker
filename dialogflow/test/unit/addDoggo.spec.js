const { v4 } = require('uuid');
const { DialogflowApiFactory } = require('../../common/DialogflowApiFactory');
const serviceAccount = require('../../serviceAccount.json');
const {
  initialResponse,
  nameResponse,
  dobResponse,
  wagResponse,
  doggoName,
  doggoDob,
  doggoTailWaggability,
} = require('../../common/responses/addDoggo');

const addDoggoTrigger = 'I want to add a doggo';

describe('Add Doggo Intent', () => {
  let dialogflow = undefined;
  let sessionId = v4();

  beforeAll(async () => {
    dialogflow = await DialogflowApiFactory.create({
      projectId: serviceAccount.project_id,
      serviceAccount,
      sessionId,
    })
  });

  afterEach(async () => {
    await dialogflow.clearSession(sessionId);
  });

  it('Asks for the doggo\'s name', async () => {
    const response = await dialogflow.detectIntent(addDoggoTrigger);
    expect(response).toEqual(expect.objectContaining(initialResponse));
  });

  it('Asks for the doggo\'s date of birth once has name', async () => {
    const response = await dialogflow.detectIntent(addDoggoTrigger);
    expect(response).toEqual(expect.objectContaining(initialResponse));
    const nameResp = await dialogflow.detectIntent(doggoName);
    expect(nameResp).toEqual(expect.objectContaining(nameResponse));
  });

  it('Asks how waggy the doggo\'s tail is once has dob and name', async () => {
    const response = await dialogflow.detectIntent(addDoggoTrigger);
    expect(response).toEqual(expect.objectContaining(initialResponse));
    const nameResp = await dialogflow.detectIntent(doggoName);
    expect(nameResp).toEqual(expect.objectContaining(nameResponse));
    const dobResp = await dialogflow.detectIntent(doggoDob);
    expect(dobResp).toEqual(expect.objectContaining(dobResponse));
  });

  it('Creates the doggo object and ends the conversation after getting data', async () => {
    const response = await dialogflow.detectIntent(addDoggoTrigger);
    expect(response).toEqual(expect.objectContaining(initialResponse));
    const nameResp = await dialogflow.detectIntent(doggoName);
    expect(nameResp).toEqual(expect.objectContaining(nameResponse));
    const dobResp = await dialogflow.detectIntent(doggoDob);
    expect(dobResp).toEqual(expect.objectContaining(dobResponse));
    const wagResp = await dialogflow.detectIntent(`${doggoTailWaggability}`);
    expect(wagResp).toEqual(expect.objectContaining(wagResponse));
  });
});

