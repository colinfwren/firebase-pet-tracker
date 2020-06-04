const {
  throwNotFoundError,
  throwOtherError,
  throwOnCreate,
  throwOnDoc,
  existingUser,
  existingDoggoUser,
  CustomError,
  existingDoggoDoc,
  existingDoc,
  existingNullDoggoDoc,
  existingNullDoggoUser,
  newUser,
} = require('../test/common');

const mockDocSet = jest.fn();

const doc = jest.fn().mockImplementation((recordId) => {
  // Check it's the resume we want to find
  if (recordId === throwOnDoc) {
    throw new Error('oh noes');
  }
  const exists = [existingUser, existingDoggoUser, existingNullDoggoUser].includes(recordId);
  return {
    get: jest.fn().mockImplementation(() => ({
      data: jest.fn().mockImplementation(() => {
        // If not the resume we want return empty object
        if (!exists) {
          return {};
        }
        if (recordId === existingUser) {
           return existingDoc;
        }
        if (recordId === existingNullDoggoUser) {
          return existingNullDoggoDoc;
        }
        return existingDoggoDoc;
      }),
      ref: {
        set: mockDocSet,
        delete: jest.fn(),
        update: jest.fn(),
      },
      exists, // use as exists flag on document read
    })),
    set: mockDocSet,
  };
});

const auth = jest.fn().mockImplementation(() => ({
  getUserByEmail: jest.fn().mockImplementation((email) => {
    const authType = email.split('@')[0];
    switch (authType) {
      case throwOtherError:
        throw new CustomError('oh noes', 'generic/not-caught');
      case throwOnCreate:
      case throwNotFoundError:
      case newUser:
        throw new CustomError('oh noes');
      default:
        return {
          uid: authType,
        };
    }
  }),
  createUser: jest.fn().mockImplementation(({ email }) => {
    const authType = email.split('@')[0];
    if (authType === throwOnCreate) {
      throw new Error('oh noes');
    }
    return {
      uid: authType,
    }
  }),
}));

const firebaseAdmin = {
  initializeApp: jest.fn(),
  firestore: jest.fn().mockImplementation(() => ({
    collection: jest.fn().mockImplementation(() => ({
      doc,
    })),
  })),
  auth,
  credential: {
    cert: jest.fn(),
  },
  mockDocSet,
};

module.exports = firebaseAdmin;
