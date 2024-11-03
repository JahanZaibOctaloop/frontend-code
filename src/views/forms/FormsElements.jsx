import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormsElements = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    role: '',
    temporaryAddress: '',
    permanentAddress: '',
    policeVerification: false,
    mobileNumber: '',
    nextOfKin: '',
    emergencyContactNumber: '',
    bloodGroup: '',
    weaponTrainingRecord: '',
    experience: '',
    dateOfBirth: '',
    dateOfJoining: '',
    reference: '',
    salarySlip: null,
    picture: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.files[0],
    }));
  };

  // Quick form validation
  const validateForm = () => {
    const requiredFields = [
      'name', 'fatherName', 'role', 'temporaryAddress', 'permanentAddress',
      'mobileNumber', 'nextOfKin', 'emergencyContactNumber', 'bloodGroup',
      'dateOfBirth', 'dateOfJoining', 'salarySlip', 'picture'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all required fields.',
      });
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/add-record`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Record Submitted!',
          text: 'Thank you for submitting your record.',
          showConfirmButton: false,
          timer: 1500, // Display for only 1.5 seconds
        });

        // Clear form after submission
        setFormData({
          name: '',
          fatherName: '',
          role: '',
          temporaryAddress: '',
          permanentAddress: '',
          policeVerification: false,
          mobileNumber: '',
          nextOfKin: '',
          emergencyContactNumber: '',
          bloodGroup: '',
          weaponTrainingRecord: '',
          experience: '',
          dateOfBirth: '',
          dateOfJoining: '',
          reference: '',
          salarySlip: null,
          picture: null,
        });

        // Reset file inputs
        document.getElementById('salarySlip').value = '';
        document.getElementById('picture').value = '';
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: errorText,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add the Record</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fatherName">
                      <Form.Label>Father's Name</Form.Label>
                      <Form.Control type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="role">
                      <Form.Label>Role</Form.Label>
                      <Form.Control as="select" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="Ex-army">Ex-army</option>
                        <option value="Civilian">Civilian</option>
                        <option value="Police">Police</option>
                        <option value="CAF">CAF</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="temporaryAddress">
                      <Form.Label>Temporary Address</Form.Label>
                      <Form.Control type="text" name="temporaryAddress" value={formData.temporaryAddress} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="permanentAddress">
                      <Form.Label>Permanent Address</Form.Label>
                      <Form.Control type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="policeVerification">
                      <Form.Check
                        type="checkbox"
                        label="Police Verification"
                        name="policeVerification"
                        checked={formData.policeVerification}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mobileNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nextOfKin">
                      <Form.Label>Next of Kin</Form.Label>
                      <Form.Control type="text" name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="emergencyContactNumber">
                      <Form.Label>Emergency Contact Number</Form.Label>
                      <Form.Control type="text" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bloodGroup">
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Control as="select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="weaponTrainingRecord">
                      <Form.Label>Weapon Training Record</Form.Label>
                      <Form.Control type="text" name="weaponTrainingRecord" value={formData.weaponTrainingRecord} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="experience">
                      <Form.Label>Experience</Form.Label>
                      <Form.Control type="text" name="experience" value={formData.experience} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateOfJoining">
                      <Form.Label>Date of Joining</Form.Label>
                      <Form.Control type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="reference">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control type="text" name="reference" value={formData.reference} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="salarySlip">
                      <Form.Label>Salary Slip</Form.Label>
                      <Form.Control type="file" name="salarySlip" onChange={handleFileChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="picture">
                      <Form.Label>Picture</Form.Label>
                      <Form.Control type="file" name="picture" onChange={handleFileChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
