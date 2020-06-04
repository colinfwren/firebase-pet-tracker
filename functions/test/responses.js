const addDoggoResponse = {
  outputContexts: [
    {
      lifespanCount: 99,
      name: expect.stringContaining('_actions_on_google'),
      parameters: {
        data: expect.stringContaining(`"name":"Prince","dob":"1997-03-09T12:00:00Z","tailWaggability":"10"`),
      },
    },
  ],
  payload: {
    google: {
      expectUserResponse: false,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: `Added Prince to your doggo list`,
            },
          },
        ],
      },
    },
  },
};

function errorResponse(errorMessage){
  return {
    payload: {
      google: {
        expectUserResponse: false,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: `Doggo Bot Encountered an error: ${errorMessage}. Please try again.`,
              },
            },
          ],
        },
      },
    },
    outputContexts: [
      {
        name: expect.stringContaining('_actions_on_google'),
        lifespanCount: 99,
        parameters: {
          data: expect.stringContaining(`"error":"${errorMessage}"`),
        },
      },
    ],
  }
}

module.exports = {
  addDoggoResponse,
  errorResponse,
}
