
import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const UserCard = ({ user, onDelete, onEdit }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onEdit(user.id, formData);
    handleClose();
  };

  return (
    <>
      <Card style={{ width: '18rem', marginBottom: '1rem' }}>
        <Card.Img variant="top" src={user.avatar} />
        <Card.Body>
          <Card.Title>{user.first_name} {user.last_name}</Card.Title>
          <Card.Text>
            Email: {user.email}
            <br />
            Gender: {user.gender}
            <br />
            Domain: {user.domain}
            <br />
            Available: {user.available ? 'Yes' : 'No'}
          </Card.Text>
          <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
          <Button variant="primary" onClick={handleShow} style={{ marginLeft: '10px' }}>Edit</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDomain">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvailable">
              <Form.Check
                type="checkbox"
                name="available"
                label="Available"
                checked={formData.available}
                onChange={(e) => handleChange({ target: { name: 'available', value: e.target.checked } })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCard;

