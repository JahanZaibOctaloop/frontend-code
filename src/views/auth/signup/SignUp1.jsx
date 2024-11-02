import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons for show/hide password
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to the backend
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success alert and clear form fields
        Swal.fire({
          icon: 'success',
          title: 'You signed up successfully!',
          showConfirmButton: false,
          timer: 2000,
        });
        // Reset form fields
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        // Display error alert with the error message from the backend
        const errorText = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorText,
        });
      }
    } catch (error) {
      // Catch any other errors (e.g., network issues)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Sign up</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-4 position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <div className="input-group mb-4 position-relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <button type="submit" className="btn btn-primary mb-4">
                      Sign up
                    </button>
                  </form>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to={'/auth/signin-1'} className="f-w-400">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
