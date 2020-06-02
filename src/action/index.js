export function addDoggo(doggo, dispatch) {
  dispatch({ type: 'add_doggo', payload: { doggo }});
  dispatch({ type: 'save_data' });
}

export function removeDoggo(name, dispatch) {
  dispatch({ type: 'remove_doggo', payload: { name }});
  dispatch({ type: 'save_data' });
}

export function loginUser(user, dispatch) {
  dispatch({ type: 'login_user', payload: { user }});
}

export function logoutUser(dispatch) {
  const user = {
    uid: '',
    image: '',
    name: '',
    authenticated: false,
  }
  dispatch({ type: 'logout_user', payload: { user }});
}
