
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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
    if (password !== confirmPassword) {
      alert("password doesnt match");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      const { user } = response;
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log("user creation error", error);
      if (error.code === 'auth/email-already-in-use') {
        alert('cannot create user, email already in use.');
      } else {
        console.log("user creation error", error);
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput required type="text" onChange={handleChange} name="displayName" value={displayName} label='Display Name' />
        <FormInput type="email" required onChange={handleChange} name="email" value={email} label="Email" />
        <FormInput type="password" required onChange={handleChange} name="password" value={password} label="Password" />
        <FormInput type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} label="Confirm Password" />
        <Button type="submit" buttonType="inverted">SIGN UP</Button>
      </form>
    </div >
  )
}

export default SignUpForm;
