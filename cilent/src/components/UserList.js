

// -----------------------------Working code /------------------------------------------------------------------------------/
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserCard from './UserCard';  // Ensure UserCard is imported
// import { Container } from 'react-bootstrap';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5100/users');
//         setUsers(response.data);
//       } catch (err) {
//         setError('Failed to fetch users');
//         console.error('Error fetching users', err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5100/users/id/${id}`);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (err) {
//       console.error('Failed to delete user', err);
//       setError('Failed to delete user');
//     }
//   };

//   const handleEdit = async (id, updatedUser) => {
//     try {
//       await axios.put(`http://localhost:5100/users/id/${id}`, updatedUser);
//       setUsers(users.map(user => (user.id === id ? updatedUser : user)));
//     } catch (err) {
//       console.error('Failed to edit user', err);
//       setError('Failed to edit user');
//     }
//   };

//   return (
//     <Container>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h1>User Cards</h1>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         users.map(user => (
//           <UserCard key={user._id} user={user} onDelete={handleDelete} onEdit={handleEdit} />
//         ))
//       )}
//     </Container>
//   );
// };

// export default UserList;


// ------------------------------Working code  without pagination end-------------------------------------------------------/ 


// ------------------------------Working code  with pagination- start------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserCard from './UserCard';  // Ensure UserCard is imported
// import { Container, Pagination } from 'react-bootstrap';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 8;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5100/users');
//         setUsers(response.data);
//       } catch (err) {
//         setError('Failed to fetch users');
//         console.error('Error fetching users', err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5100/users/id/${id}`);
//       setUsers(users.filter(user => user.id !== id));
//     } catch (err) {
//       console.error('Failed to delete user', err);
//       setError('Failed to delete user');
//     }
//   };

//   const handleEdit = async (id, updatedUser) => {
//     try {
//       await axios.put(`http://localhost:5100/users/id/${id}`, updatedUser);
//       setUsers(users.map(user => (user.id === id ? updatedUser : user)));
//     } catch (err) {
//       console.error('Failed to edit user', err);
//       setError('Failed to edit user');
//     }
//   };

//   // Pagination Logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Pagination Controls
//   const totalPages = Math.ceil(users.length / usersPerPage);
  
//   return (
//     <Container>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <h1>User Cards</h1>
//       {currentUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         currentUsers.map(user => (
//           <UserCard key={user._id} user={user} onDelete={handleDelete} onEdit={handleEdit} />
//         ))
//       )}
      
//       {/* Pagination Controls */}
//       <Pagination>
//         <Pagination.Prev
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         />
//         {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => paginate(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//         <Pagination.Next
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         />
//       </Pagination>
//     </Container>
//   );
// };

// export default UserList;









//------------------------------Working code with pagination ends ------------------------------------------------------- 




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { Container, Row, Col, Pagination, Form, Button, Alert } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    domain: '',
    available: false,
    avatar: '' // Optional
  });

  // Filter and search state
  const [domainFilter, setDomainFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5100/users');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with all users
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedUsers = [...users];

      if (domainFilter) {
        updatedUsers = updatedUsers.filter(user => user.domain === domainFilter);
      }
      if (genderFilter) {
        updatedUsers = updatedUsers.filter(user => user.gender === genderFilter);
      }
      if (availabilityFilter !== '') {
        updatedUsers = updatedUsers.filter(user => user.available === availabilityFilter);
      }
      if (searchQuery) {
        updatedUsers = updatedUsers.filter(user =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredUsers(updatedUsers);
    };

    applyFilters();
  }, [domainFilter, genderFilter, availabilityFilter, searchQuery, users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5100/users/id/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Failed to delete user', err);
      setError('Failed to delete user');
    }
  };

  const handleEdit = async (id, updatedUser) => {
    try {
      await axios.put(`http://localhost:5100/users/id/${id}`, updatedUser);
      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    } catch (err) {
      console.error('Failed to edit user', err);
      setError('Failed to edit user');
    }
  };

  const handleCreate = async () => {
    try {
      if (!newUser.first_name || !newUser.last_name || !newUser.email) {
        setError('First name, last name, and email are required');
        return;
      }
      const response = await axios.post('http://localhost:5100/users', newUser);
      setUsers([...users, response.data]);
      setShowCreateForm(false);
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        domain: '',
        available: false,
        avatar: ''
      });
    } catch (err) {
      console.error('Failed to create user', err);
      setError('Failed to create user');
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Controls
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1>User Cards</h1>

      {/* Create User Form */}
      {showCreateForm ? (
        <div>
          <h2>Create New User</h2>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDomain">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter domain"
                value={newUser.domain}
                onChange={(e) => setNewUser({ ...newUser, domain: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={newUser.available}
                onChange={(e) => setNewUser({ ...newUser, available: e.target.checked })}
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter avatar URL"
                value={newUser.avatar}
                onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreate}>
              Create User
            </Button>
            <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      ) : (
        <Button variant="primary" onClick={() => setShowCreateForm(true)}>
          Create New User
        </Button>
      )}

      {/* Search and Filter Form */}
      <Form className="my-4">
        <Form.Group controlId="formSearch">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by first or last name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDomainFilter">
          <Form.Label>Filter by Domain</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter domain"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGenderFilter">
          <Form.Label>Filter by Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAvailabilityFilter">
          <Form.Label>Filter by Availability</Form.Label>
          <Form.Check
            type="checkbox"
            label="Available"
            checked={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.checked)}
          />
        </Form.Group>
      </Form>

      {/* Display User Cards */}
      <Row>
        {currentUsers.map(user => (
          <Col xs={12} md={6} lg={3} key={user._id}>
            <UserCard user={user} onDelete={handleDelete} onEdit={handleEdit} />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
