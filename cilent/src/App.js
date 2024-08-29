// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [users, setUsers] = useState([]);

//     // Fetch users when the component mounts
//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:5100/users');
//             console.log('API Response:', response.data);
//             setUsers(response.data);  
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>User Cards</h1>
//             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {users.length > 0 ? (
//                     users.map(user => (
//                         <div key={user.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px' }}>
//                             <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{ width: '100%' }} />
//                             <h2>{user.first_name} {user.last_name}</h2>
//                             <p>Email: {user.email}</p>
//                             <p>Gender: {user.gender}</p>
//                             <p>Domain: {user.domain}</p>
//                             <p>Available: {user.available ? 'Yes' : 'No'}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No users found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

// const App = () => {
//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         email: '',
//         gender: '',
//         domain: '',
//         available: false
//     });

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:5100/users');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             console.log(`Deleting user with id: ${id}`); // Log the id being deleted
//             await axios.delete(`http://localhost:5100/users/${id}`);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleEdit = (user) => {
//         setEditingUser(user._id);
//         setFormData({
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email,
//             gender: user.gender,
//             domain: user.domain,
//             available: user.available
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleUpdate = async () => {
//         try {
//             console.log(`Updating user with id: ${editingUser}`); // Log the id being updated
//             await axios.put(`http://localhost:5100/users/${editingUser}`, formData);
//             setEditingUser(null);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return (
//         <Container>
//             <h1 className="my-4 text-center">User Cards</h1>
//             <Row>
//                 {users.length > 0 ? (
//                     users.map((user) => (
//                         <Col key={user._id} md={4} className="mb-4">
//                             <Card className="shadow-sm">
//                                 <Card.Img variant="top" src={user.avatar} />
//                                 <Card.Body>
//                                     <Card.Title>{user.first_name} {user.last_name}</Card.Title>
//                                     <Card.Text>
//                                         Email: {user.email} <br />
//                                         Gender: {user.gender} <br />
//                                         Domain: {user.domain} <br />
//                                         Available: {user.available ? 'Yes' : 'No'}
//                                     </Card.Text>
//                                     <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
//                                     <Button variant="danger" className="ms-2" onClick={() => handleDelete(user._id)}>Delete</Button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))
//                 ) : (
//                     <p className="text-center">No users found.</p>
//                 )}
//             </Row>
            
//             {editingUser && (
//                 <div className="mt-4">
//                     <h2 className="mb-3">Edit User</h2>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="first_name"
//                                 value={formData.first_name}
//                                 onChange={handleInputChange}
//                                 placeholder="First Name"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="last_name"
//                                 value={formData.last_name}
//                                 onChange={handleInputChange}
//                                 placeholder="Last Name"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 placeholder="Email"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Gender</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleInputChange}
//                                 placeholder="Gender"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Domain</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="domain"
//                                 value={formData.domain}
//                                 onChange={handleInputChange}
//                                 placeholder="Domain"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Check
//                                 type="checkbox"
//                                 name="available"
//                                 checked={formData.available}
//                                 onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
//                                 label="Available"
//                             />
//                         </Form.Group>
//                         <Button variant="success" onClick={handleUpdate}>Update</Button>
//                     </Form>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default App;


// import React from 'react';
// import UserList from './components/UserList';
// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>User Management</h1>
//       </header>
//       <main>
//         <UserList />
//       </main>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function App() {
  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;

