function addDoggoRequest(token = 'existingUser') {
  return {
    responseId: 'e30bca08-bdfc-4e58-a5f6-598123eeb068-b4a98e7e',
    queryResult: {
      queryText: '10',
      action: 'add_doggo',
      parameters: {
        name: 'Prince',
        dob: '1997-03-09T12:00:00Z',
        tailWaggability: 10,
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
      outputContexts: [
        {
          name: 'projects/doggos-841b5/agent/sessions/a8e6fe5b-e112-1adf-1a8e-9eb11781e395/contexts/__system_counters__',
          parameters: {
            'no-input': 0,
            'no-match': 0,
            name: 'Prince',
            'name.original': 'Prince',
            dob: '1997-03-09T12:00:00Z',
            'dob.original': '9th March 1997',
            tailWaggability: 10,
            'tailWaggability.original': '10',
          },
        },
      ],
      intent: {
        name: 'projects/doggos-841b5/agent/intents/aad9d7ec-50cc-453e-8d37-e0459f8c2e65',
        displayName: 'Add Doggo',
        endInteraction: true,
      },
      intentDetectionConfidence: 1,
      languageCode: 'en',
    },
    originalDetectIntentRequest: {
      payload: {
        user: {
          idToken: token,
          userStorage: '',
          profile: {
            givenName: 'Test',
            familyName: 'User',
            displayName: 'Test User',
          },
        },
      },
    },
    session: 'projects/doggos-841b5/agent/sessions/a8e6fe5b-e112-1adf-1a8e-9eb11781e395',
  }
}

module.exports = {
  addDoggoRequest,
}
