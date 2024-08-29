// // import React from 'react';

// // const UserCard = ({ user, onEdit, onDelete }) => {
// //     return (
// //         <div style={styles.card}>
// //             <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={styles.avatar} />
// //             <h2>{user.first_name} {user.last_name}</h2>
// //             <p>Email: {user.email}</p>
// //             <p>Gender: {user.gender}</p>
// //             <p>Domain: {user.domain}</p>
// //             <p>Available: {user.available ? 'Yes' : 'No'}</p>
// //             <div style={styles.buttons}>
// //                 <button onClick={() => onEdit(user)}>Edit</button>
// //                 <button onClick={() => onDelete(user._id)}>Delete</button>
// //             </div>
// //         </div>
// //     );
// // };

// // const styles = {
// //     card: {
// //         border: '1px solid #ccc',
// //         borderRadius: '10px',
// //         padding: '20px',
// //         margin: '20px',
// //         textAlign: 'center',
// //         boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
// //     },
// //     avatar: {
// //         borderRadius: '50%',
// //         marginBottom: '15px',
// //     },
// //     buttons: {
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         marginTop: '10px',
// //     },
// // };

// // export default UserCard;


// import React, { useState } from 'react';
// import { Card, Button, Modal, Form } from 'react-bootstrap';

// const UserCard = ({ user, onDelete, onUpdate }) => {
//     const [show, setShow] = useState(false);
//     const [formData, setFormData] = useState({
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         domain: user.domain,
//         available: user.available
//     });

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleUpdate = () => {
//         onUpdate(user.id, formData);
//         handleClose();
//     };

//     return (
//         <Card style={{ width: '18rem', margin: '10px' }}>
//             <Card.Img variant="top" src={user.avatar} />
//             <Card.Body>
//                 <Card.Title>{user.first_name} {user.last_name}</Card.Title>
//                 <Card.Text>
//                     Email: {user.email}<br/>
//                     Domain: {user.domain}<br/>
//                     Available: {user.available ? 'Yes' : 'No'}
//                 </Card.Text>
//                 <Button variant="primary" onClick={handleShow}>Edit</Button>
//                 <Button variant="danger" onClick={() => onDelete(user.id)} style={{ marginLeft: '10px' }}>Delete</Button>
//             </Card.Body>

//             {/* Modal for editing user */}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit User</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group>
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="first_name"
//                                 value={formData.first_name}
//                                 onChange={handleInputChange}
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="last_name"
//                                 value={formData.last_name}
//                                 onChange={handleInputChange}
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Domain</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="domain"
//                                 value={formData.domain}
//                                 onChange={handleInputChange}
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Check
//                                 type="checkbox"
//                                 label="Available"
//                                 name="available"
//                                 checked={formData.available}
//                                 onChange={() => setFormData({ ...formData, available: !formData.available })}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleUpdate}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </Card>
//     );
// };

// export default UserCard;

// const UserCard = ({ user, onDelete, onEdit }) => {
//   return (
//     <Card style={{ width: '18rem', marginBottom: '1rem' }}>
//       <Card.Img variant="top" src={user.avatar} />
//       <Card.Body>
//         <Card.Title>{user.first_name} {user.last_name}</Card.Title>
//         <Card.Text>
//           Email: {user.email}
//           <br />
//           Gender: {user.gender}
//           <br />
//           Domain: {user.domain}
//           <br />
//           Available: {user.available ? 'Yes' : 'No'}
//         </Card.Text>
//         <Button variant="primary" onClick={() => onEdit(user)}>Edit</Button>{' '}
//         <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
//       </Card.Body>
//     </Card>
//   );
// };


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

