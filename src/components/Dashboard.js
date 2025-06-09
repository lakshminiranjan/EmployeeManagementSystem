import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from './EmployeeCard';
import AddModal from './AddModal';
import { getEmployees, createEmployee } from '../services/api';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        } catch (err) {
            console.error('Failed to fetch employees:', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const filtered = employees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddEmployee = async (newEmployee) => {
        try {
            await createEmployee(newEmployee);
            setAlertMessage('Employee added successfully!');
            setTimeout(() => setAlertMessage(''), 3000);
            setShowAddModal(false);
            fetchEmployees();
        } catch (err) {
            console.error('Failed to add employee:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employee Dashboard</h2>
                <Button variant="outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-righte"></i> Logout
                </Button>
            </div>
            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                 <div className="flex-grow-1 me-2">
                   <input
                     type="text"
                     className="form-control"
                     placeholder="Search by name, email, or department"
                     value={searchTerm}
                     onChange={handleSearch}
                   />
                 </div>
                 <Button variant="primary" onClick={() => setShowAddModal(true)}>
                   <i className="bi bi-plus-circle me-1"></i> Add Employee
                 </Button>
            </div>


            <div className="employee-grid">
                {filteredEmployees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onUpdate={fetchEmployees}
                        onDelete={fetchEmployees}
                    />
                ))}
            </div>

            <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onSave={handleAddEmployee}
            />
        </div>
    );
};

export default Dashboard;
