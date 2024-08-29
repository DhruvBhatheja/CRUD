
// const express = require('express');
// const connectDB = require('./index'); 
// const User = require('./models/User'); 

// const app = express();
// const port = 5100;


// connectDB();


// app.use(express.json());


// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find(); 
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



// server.js
// const express = require('express');
// const connectDB = require('./index'); // Import connection function
// const User = require('./models/User'); // Import User model

// const app = express();
// const port = 5100;

// // Connect to MongoDB
// connectDB();

// // Middleware to parse JSON
//  app.use(cors());
// app.use(express.json());

// // Create a new user
// app.post('/users', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Get all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.get('/users/id/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id); // Convert to number
//         const user = await User.findOne({ id: userId }); // Query by `id` field
        
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Update a user by ID
// app.put('/users/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
//         if (updatedUser) {
//             res.json(updatedUser);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Delete a user by ID
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const result = await User.findByIdAndDelete(userId);
//         if (result) {
//             res.json({ message: 'User deleted' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const connectDB = require('./index'); // Import connection function
const User = require('./models/User'); // Import User model

const app = express();
const port = 5100;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/users/id/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id); // Convert to number
        const user = await User.findOne({ id: userId }); // Query by `id` field
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user by custom `id` field
// app.put('/users/id/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id); // Convert to number if necessary
//         console.log('>>>>>>', req.params.id); // Log the ID to verify
//         const updatedUser = await User.findOneAndUpdate(
//             { id: userId }, // Query by custom `id`
//             req.body, // Data to update
//             { new: true } // Return the updated document
//         );

//         if (updatedUser) {
//             res.json(updatedUser); // Send the updated user data back to the client
//         } else {
//             res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message }); // Handle any errors
//     }
// });

app.put('/users/id/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id); // Convert to number if necessary
        console.log('User ID:', userId); // Log the ID to verify

        console.log('Request Body:', req.body); // Log the request body to verify the data

        // Create a copy of req.body without the _id field
        const updateData = { ...req.body };
        delete updateData._id;

        // Use $set to specify the fields that should be updated
        const updatedUser = await User.findOneAndUpdate(
            { id: userId }, // Query by custom `id`
            { $set: updateData }, // Use $set to update the fields
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            res.json(updatedUser); // Send the updated user data back to the client
        } else {
            res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle any errors
    }
});



// app.delete('/users/id/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id); 
//        console.log('>>>>>>',req,params.id)
//         const result = await User.findOneAndDelete({ id: userId }); 

//         if (result) {
//             res.json({ message: 'User deleted' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

app.delete('/users/id/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id); 
        console.log('Deleting user with ID:', userId); // Corrected log statement
        const result = await User.findOneAndDelete({ id: userId }); 

        if (result) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
