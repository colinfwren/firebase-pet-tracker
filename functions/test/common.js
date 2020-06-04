class CustomError extends Error {
  constructor(foo = 'bar', code = 'auth/user-not-found' ,...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
    // Custom debugging information
    this.code = code;
  }
}

const existingUser = 'existingUser';

const user = {
  uid: existingUser,
}

const doggo = {
  name: 'Coronavirus',
  dob: '2020-03-22T12:00:00Z',
  tailWaggability: 1,
};

const existingDoc = {
  doggos: [],
  user,
};

const existingDoggoDoc = {
  doggos: [ doggo ],
  user,
};

const existingNullDoggoDoc = {
  doggos: null,
  user,
}

module.exports = {
  newUser: 'newUser',
  existingUser,
  existingDoggoUser: 'existingDoggoUser',
  existingNullDoggoUser: 'existingNullDoggoUser',
  throwNotFoundError: 'throwNotFoundError',
  throwOtherError: 'throwOtherError',
  throwOnCreate: 'throwOnCreate',
  throwOnDoc: 'throwOnDoc',
  CustomError,
  existingDoc,
  existingDoggoDoc,
  existingNullDoggoDoc,
}
