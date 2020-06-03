const doggoName = 'Prince';
const doggoDob = '9th March 1997';
const doggoDobDate = expect.stringContaining('1997-03-09');
const doggoTailWaggability = 10;

const initialResponse = {
  responseId: expect.any(String),
  queryResult: {
    queryText: 'I want to add a doggo',
    parameters: {
      dob: '',
      tailWaggability: '',
      name: '',
    },
    fulfillmentText: 'What\'s the doggo\'s name?',
    fulfillmentMessages: [
      {
        text: {
          text: [
            'What\'s the doggo\'s name?',
          ],
        },
      },
    ],
    outputContexts: [
      {
        name: expect.stringContaining('_id_dialog_context'),
        lifespanCount: 2,
        parameters: {
          'tailWaggability.original': '',
          'dob.original': '',
          dob: '',
          name: '',
          'name.original': '',
          tailWaggability: '',
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_context'),
        lifespanCount: 2,
        parameters: {
          'name.original': '',
          tailWaggability: '',
          name: '',
          dob: '',
          'dob.original': '',
          'tailWaggability.original': '',
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_params_name'),
        lifespanCount: 1,
        parameters: {
          dob: '',
          name: '',
          'tailWaggability.original': '',
          tailWaggability: '',
          'name.original': '',
          'dob.original': '',
        },
      },
      {
        name: expect.stringContaining('__system_counters__'),
        lifespanCount: 1,
        parameters: {
          'no-match': 0,
          'dob.original': '',
          tailWaggability: '',
          name: '',
          'name.original': '',
          'tailWaggability.original': '',
          dob: '',
          'no-input': 0,
        },
      },
    ],
    intent: {
      name: expect.stringContaining('projects/doggos-841b5/agent/intents/'),
      displayName: 'Add Doggo',
    },
    intentDetectionConfidence: 1,
    languageCode: 'en',
  },
}

const nameResponse =  {
  responseId: expect.any(String),
  queryResult: {
    queryText: doggoName,
    parameters: {
      name: doggoName,
      tailWaggability: '',
      dob: '',
    },
    fulfillmentText: 'When was your life blessed by the floof?',
    fulfillmentMessages: [
      {
        text: {
          text: [
            'When was your life blessed by the floof?',
          ],
        },
      },
    ],
    outputContexts: [
      {
        name: expect.stringContaining('_id_dialog_context'),
        lifespanCount: 2,
        parameters: {
          'dob.original': '',
          tailWaggability: '',
          dob: '',
          'name.original': doggoName,
          'tailWaggability.original': '',
          name: doggoName,
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_context'),
        lifespanCount: 2,
        parameters: {
          'name.original': doggoName,
          tailWaggability: '',
          dob: '',
          'dob.original': '',
          name: doggoName,
          'tailWaggability.original': '',
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_params_dob'),
        lifespanCount: 1,
        parameters: {
          'tailWaggability.original': '',
          dob: '',
          'name.original': doggoName,
          tailWaggability: '',
          name: doggoName,
          'dob.original': '',
        },
      },
      {
        name: expect.stringContaining('contexts/__system_counters__'),
        lifespanCount: 1,
        parameters: {
          dob: '',
          tailWaggability: '',
          'name.original': doggoName,
          'tailWaggability.original': '',
          'no-match': 0,
          'no-input': 0,
          'dob.original': '',
          name: doggoName,
        },
      },
    ],
    intent: {
      name: expect.stringContaining('projects/doggos-841b5/agent/intents'),
      displayName: 'Add Doggo',
    },
    intentDetectionConfidence: 0.01,
    languageCode: 'en',
  },
}

const dobResponse = {
  responseId: expect.any(String),
  queryResult: {
    queryText: doggoDob,
    parameters: {
      dob: doggoDobDate,
      name: doggoName,
      tailWaggability: '',
    },
    fulfillmentText: 'How waggy is the good boy\'s tail? On a scale of 1 to 10',
    fulfillmentMessages: [
      {
        text: {
          text: [
            'How waggy is the good boy\'s tail? On a scale of 1 to 10',
          ],
        },
      },
    ],
    outputContexts: [
      {
        name: expect.stringContaining('_id_dialog_context'),
        lifespanCount: 2,
        parameters: {
          'tailWaggability.original': '',
          tailWaggability: '',
          dob: doggoDobDate,
          'name.original': doggoName,
          name: doggoName,
          'dob.original': doggoDob,
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_context'),
        lifespanCount: 2,
        parameters: {
          name: doggoName,
          tailWaggability: '',
          dob: doggoDobDate,
          'dob.original': doggoDob,
          'tailWaggability.original': '',
          'name.original': doggoName,
        },
      },
      {
        name: expect.stringContaining('contexts/add_doggo_dialog_params_tailwaggability'),
        lifespanCount: 1,
        parameters: {
          'tailWaggability.original': '',
          'name.original': doggoName,
          tailWaggability: '',
          'dob.original': doggoDob,
          name: doggoName,
          dob: doggoDobDate,
        },
      },
      {
        name: expect.stringContaining('contexts/__system_counters__'),
        lifespanCount: 1,
        parameters: {
          'tailWaggability.original': '',
          'dob.original': doggoDob,
          'name.original': doggoName,
          tailWaggability: '',
          dob: doggoDobDate,
          'no-input': 0,
          'no-match': 0,
          name: doggoName,
        },
      },
    ],
    intent: {
      name: expect.stringContaining('projects/doggos-841b5/agent/intents'),
      displayName: 'Add Doggo',
    },
    intentDetectionConfidence: 1,
    languageCode: 'en',
  },
}

const wagResponse = {
  responseId: expect.any(String),
  queryResult: {
    queryText: `${doggoTailWaggability}`,
    parameters: {
      dob: doggoDobDate,
      name: doggoName,
      tailWaggability: doggoTailWaggability,
    },
    allRequiredParamsPresent: true,
    fulfillmentText: 'Added that doggo for you',
    fulfillmentMessages: [
      {
        text: {
          text: [
            'Added that doggo for you',
          ],
        },
      },
    ],
    intent: {
      name: expect.stringContaining('projects/doggos-841b5/agent/intents'),
      displayName: 'Add Doggo',
    },
    intentDetectionConfidence: 1,
    diagnosticInfo: {
      end_conversation: true,
    },
    languageCode: 'en',
  },
}



module.exports = {
  initialResponse,
  nameResponse,
  dobResponse,
  wagResponse,
  doggoName,
  doggoDob,
  doggoTailWaggability,
}
