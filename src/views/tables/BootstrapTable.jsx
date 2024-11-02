import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Image, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BootstrapTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
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
  });

  // Fetch all records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/all-records`);
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error('Failed to fetch records');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Handle Edit Modal Open
  const handleEdit = (record) => {
    setCurrentRecord(record);
    setFormData({
      name: record.name,
      fatherName: record.fatherName,
      role: record.role,
      temporaryAddress: record.temporaryAddress,
      permanentAddress: record.permanentAddress,
      policeVerification: record.policeVerification,
      mobileNumber: record.mobileNumber,
      nextOfKin: record.nextOfKin,
      emergencyContactNumber: record.emergencyContactNumber,
      bloodGroup: record.bloodGroup,
      weaponTrainingRecord: record.weaponTrainingRecord,
      experience: record.experience,
      dateOfBirth: new Date(record.dateOfBirth).toISOString().split('T')[0], // Format to YYYY-MM-DD
      dateOfJoining: new Date(record.dateOfJoining).toISOString().split('T')[0],
      reference: record.reference,
    });
    setShowModal(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Submit Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/edit-record/${currentRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prevRecords) =>
          prevRecords.map((rec) => (rec._id === currentRecord._id ? updatedRecord.record : rec))
        );
        Swal.fire('Updated!', 'Record has been updated.', 'success');
        setShowModal(false);
      } else {
        Swal.fire('Error!', 'Failed to update record.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to update record. Try again later.', 'error');
      console.error('Error updating record:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">All Records of Guard</Card.Title>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p>Loading records...</p>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Mobile Number</th>
                      <th>Date of Birth</th>
                      <th>Date of Joining</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={record._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {record.picture ? (
                            <Image
                              src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${record.picture}`}
                              alt="Guard"
                              thumbnail
                              width={50}
                              height={50}
                            />
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td>{record.name}</td>
                        <td>{record.role}</td>
                        <td>{record.mobileNumber}</td>
                        <td>{new Date(record.dateOfBirth).toLocaleDateString()}</td>
                        <td>{new Date(record.dateOfJoining).toLocaleDateString()}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(record)}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(record._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formFatherName">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formTemporaryAddress">
              <Form.Label>Temporary Address</Form.Label>
              <Form.Control type="text" name="temporaryAddress" value={formData.temporaryAddress} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPermanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPoliceVerification">
              <Form.Check
                type="checkbox"
                label="Police Verification"
                name="policeVerification"
                checked={formData.policeVerification}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formNextOfKin">
              <Form.Label>Next of Kin</Form.Label>
              <Form.Control type="text" name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmergencyContactNumber">
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control type="text" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formWeaponTrainingRecord">
              <Form.Label>Weapon Training Record</Form.Label>
              <Form.Control type="text" name="weaponTrainingRecord" value={formData.weaponTrainingRecord} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text" name="experience" value={formData.experience} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formDateOfJoining">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formReference">
              <Form.Label>Reference</Form.Label>
              <Form.Control type="text" name="reference" value={formData.reference} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default BootstrapTable;
