import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import credentials from './credentials';

class Firebase {
  constructor() {
    app.initializeApp(credentials);
    this.db = app.firestore();
    this.auth = app.auth();
    this.uid = false;
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.auth.onAuthStateChanged((authUser) => {
      this.uid = authUser != null ? authUser.uid : false;
    });
  }

  doLoginWithGoogle = async (dispatch) => {
      try{
          const result = await this.auth.signInWithPopup(this.googleProvider);
          this.uid = result.user.uid;
          dispatch({
              type: 'user_details',
              payload: { ...result.additionalUserInfo.profile, ...{ uid: this.uid, authenticated: true }},
          });
      } catch (err) {
          console.error('doLoginWithGoogle', err);
      }
  }

  getDoggosForUser = async (dispatch) => {
    try {
      const doggosRef = await this.db.collection('doggos').doc(this.uid);
      const doggoRef = await doggosRef.get();
      if (doggoRef.exists) {
        const data = await doggoRef.data();
        dispatch({ type: 'load_data', payload: { data }});
        dispatch({ type: 'save_data' });
        return true;
      }
      throw new Error('Doggos for user does not exist');
    } catch (err) {
      console.error('getDoggosForUser', err);
      return false;
    }
  }

  saveDoggosForUser = async (doggos) => {
    if(this.uid){
      try {
        const toSave = JSON.parse(JSON.stringify(doggos));
        const doggosRef = await this.db.collection('doggos').doc(this.uid);
        await doggosRef.set(toSave);
      } catch (err) {
        console.error('saveDoggosForUser', err);
      }
    }
  }

  signOut = async (dispatch) => {
    try{
      await this.auth.signOut();
      dispatch({
        type: 'logout_user',
      });
    } catch (err) {
      console.log('signOut', err);
    }
  }
}

export default Firebase;