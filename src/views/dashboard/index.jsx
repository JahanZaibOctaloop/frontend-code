import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import verifyAdmin from 'middleware/verifyAdmin'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashDefault = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalRecords: 0,
    todayRecords: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin
    if (!verifyAdmin()) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to access this page. Only admins are allowed.',
      }).then(() => {
        navigate('/'); 
      });
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/dashboard-stats`);
        setDashboardStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const dashSalesData = [
    { title: 'Total Records', amount: dashboardStats.totalRecords, icon: 'icon-database text-c-green' },
    { title: 'Today\'s Records', amount: dashboardStats.todayRecords, icon: 'icon-calendar text-c-blue' },
    { title: 'Total Users', amount: dashboardStats.totalUsers, icon: 'icon-users text-c-orange' },
    { title: 'Today Attendance', icon: 'icon-users text-c-orange' },
  ];

  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => (
          <Col key={index} xl={6} xxl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">{data.title}</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather ${data.icon} f-30 m-r-5`} /> {data.amount || 'N/A'}
                    </h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
