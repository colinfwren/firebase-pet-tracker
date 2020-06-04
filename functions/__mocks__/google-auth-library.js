/**
 * File: __mocks__/google-auth-library.js
 */
class OAuth2Client {
  constructor() {}
  verifyIdToken(token) {
    return {
      getPayload: jest.fn().mockImplementation(() => ({
        email: `${token.idToken}@test.com`,
      })),
    };
  }
}

module.exports = {
  OAuth2Client,
}
