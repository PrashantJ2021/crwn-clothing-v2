import { useEffect } from 'react';
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response?.user);
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const { user } = response;
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google redirect
      </button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;