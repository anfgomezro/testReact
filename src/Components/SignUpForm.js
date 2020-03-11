import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  const history = useHistory();
  return (
    <>
      <h1>Sign Up!</h1>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Must be 8 characters at least")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss")
            .required("Required"),
        })}
        onSubmit={(values) => {
          fetch('/sign-up', {method: 'post', body: JSON.stringify(values), headers:{
            'Content-Type': 'application/json'
          }})
            .then(res => res.json())
            .then(json => {
                if(json.err) {
                  console.log(json.err);
                }  else {
                  history.push('/service');
                }
            })
            .catch(err => console.log(err));
        }}
      >
        <Form>
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder=""
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

module.exports = SignupForm;
