import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Image, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const BootstrapTable = () => {
  const [records, setRecords] = useState([]);
  const [attendance, setAttendance] = useState([]);
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
    salarySlip: null,
    picture: null,
  });

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


    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/attendance`);
        if (response.ok) {
          const data = await response.json();
          setAttendance(data);
        } else {
          console.error('Failed to fetch attendance');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
    fetchAttendance();
  }, []);

  const checkAttendanceStatus = (recordId) => {
    return attendance.some((entry) => entry.record_id === recordId) ? 'Present' : 'Absent';
  };


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
      dateOfBirth: new Date(record.dateOfBirth).toISOString().split('T')[0],
      dateOfJoining: new Date(record.dateOfJoining).toISOString().split('T')[0],
      reference: record.reference,
      salarySlip: record.salarySlip,
      picture: record.picture,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

// Handle Submit Edit Form
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Check formData contents before sending
  console.log('Form Data:', formData);
  
  // Prepare FormData object
  const formDataToSend = new FormData();
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== undefined) { 
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key].toString());
      }
    }
  }

  for (let [key, value] of formDataToSend.entries()) {
    console.log(key, value );
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/edit-record/${currentRecord._id}`, {
      method: 'PUT',
      body: formDataToSend, // Send FormData
    });

    if (response.ok) {
      const { record: updatedRecord } = await response.json();

      setRecords((prevRecords) =>
        prevRecords.map((rec) => (rec._id === currentRecord._id ? updatedRecord : rec))
      );

      // Show success alert and close modal
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



  // Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/delete-record/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setRecords((prevRecords) => prevRecords.filter((rec) => rec._id !== id));
            Swal.fire('Deleted!', 'Record has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete record. Try again later.', 'error');
          console.error('Error deleting record:', error);
        }
      }
    });
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
                      <th>Salary</th>
                      <th>Mobile Number</th>
                      <th>Date of Birth</th>
                      <th>Pay Abel</th>
                      <th>Date of Joining</th>
                      <th>Action</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={record._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {record.picture ? (
                            <Image src={record.picture} alt="Guard" thumbnail width={50} height={50} />
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td>{record.name}</td>
                        <td>{record.role}</td>
                        <td>{record.salarySlip}</td>
                        <td>{record.mobileNumber}</td>
                        <td>{new Date(record.dateOfBirth).toLocaleDateString()}</td>
                        <td>20000</td>
                        <td>{new Date(record.dateOfJoining).toLocaleDateString()}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(record)}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(record._id)}>
                            Delete
                          </Button>
                        </td>
                        <td>
                        <Button
                            variant={checkAttendanceStatus(record._id) === 'Present' ? 'success' : 'danger'}
                            size="sm"
                          >
                            {checkAttendanceStatus(record._id)}
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
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <Form.Group controlId="formSalarySlip">
              <Form.Label>Salary Slip</Form.Label>
              <Form.Control type="text" value={formData.salarySlip} name="salarySlip" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPicture">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" name="picture" onChange={handleFileChange} />
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
