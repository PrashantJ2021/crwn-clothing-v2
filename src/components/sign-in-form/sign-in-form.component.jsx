
import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      const { user } = response;
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password': alert('incorrect password for email');
          break;
        case 'auth/user-not-found': alert('no user associated with this email');
          break;
        default: console.log(error);
      }
    }
  }
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput type="email" required onChange={handleChange} name="email" value={email} label="Email" />
        <FormInput type="password" required onChange={handleChange} name="password" value={password} label="Password" />
        <div className="buttons-container">
          <Button type="submit" >SIGN In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google SignIn</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogleRedirect}>Redirect signin</Button>
          {/* use type=button in above else when clicked on google signin button and if the form is also filled. then it will send the form data too */}
        </div>
      </form>
    </div >
  )
}

export default SignInForm;
