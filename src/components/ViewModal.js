import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewModal = ({ show, onHide, employee }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {employee && (
                    <>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                        <p><strong>Phone:</strong> {employee.phone}</p>
                        <p><strong>Salary:</strong> ₹{employee.salary}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewModal;