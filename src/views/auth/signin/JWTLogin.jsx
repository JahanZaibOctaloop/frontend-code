import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const JWTLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '' }} // Setting empty initial values
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();

            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);

            // Success alert
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'Welcome back!',
              showConfirmButton: false,
              timer: 2000,
            });

            // Redirect to dashboard or desired page
            navigate('/dashboard'); // Replace '/dashboard' with your desired route
          } else {
            const errorText = await response.text();
            setErrors({ submit: errorText });
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: errorText,
            });
          }
        } catch (error) {
          setErrors({ submit: 'Something went wrong. Please try again later.' });
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              placeholder="Enter your email address"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4 position-relative">
            <input
              className="form-control"
              placeholder="Enter your password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            <span
              className="position-absolute end-0 top-50 translate-middle-y me-3"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
