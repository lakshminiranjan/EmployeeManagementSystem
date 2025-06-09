import React, { useState } from 'react';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import { updateEmployee, deleteEmployee } from '../services/api';

const EmployeeCard = ({ employee, onUpdate, onDelete }) => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleEditSave = async (updatedEmployee) => {
        try {
            await updateEmployee(employee.id, updatedEmployee);
            setShowEditModal(false);
            setAlertMessage('Employee updated successfully!');
            setTimeout(() => setAlertMessage(''), 3000);
            onUpdate();
        } catch (err) {
            console.error('Failed to update employee:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEmployee(employee.id);
            setAlertMessage('Employee deleted successfully!');
            setTimeout(() => setAlertMessage(''), 3000);
            onDelete();
        } catch (err) {
            console.error('Failed to delete employee:', err);
        }
    };

    return (
        <div className="employee-card">
            <img
                src="https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                alt="Profile"
                className="profile-img"
            />

            <div className="employee-info">
                <h5>{employee.name}</h5>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Mobile:</strong> {employee.phone}</p>
            </div>

            <div className="card-actions">
                <button className="btn btn-warning btn-sm" onClick={() => setShowViewModal(true)}>
                <i className="bi bi-eye"></i> View
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => setShowEditModal(true)}>
                <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                <i className="bi bi-trash"></i> Delete
                </button>
            </div>

            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}

            <ViewModal
                show={showViewModal}
                onHide={() => setShowViewModal(false)}
                employee={employee}
            />
            <EditModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                employee={employee}
                onSave={handleEditSave}
            />
        </div>
    );
};

export default EmployeeCard;
