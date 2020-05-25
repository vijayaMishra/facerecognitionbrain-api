const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2a$10$oS16Vw6KvT9b3xSSL7E5Leg7pQf8y3gKJm.cPpCSsM1gjdj3aFkkq', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$oS16Vw6KvT9b3xSSL7E5Leg7pQf8y3gKJm.cPpCSsM1gjdj3aFkkq', function(err, res) {
        console.log('second guess', res);
    });
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(404).json('Error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        // password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if(!found) {
        res.status(400).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(400).json('user not found');
    }
})



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
})















// const http = require('http');

// const server = http.createServer((request, response) => {

//     // console.log('header', request.headers);
//     console.log('method', request.method);
//     console.log('url', request.url);

//     const user = {
//         name: 'John',
//         hobby: 'Skating'
//     }
//     response.setHeader('Content-Type', 'application/json')
//     response.end(JSON.stringify(user));

//     //// console.log('I hear you, thanks for the request')
//     ////response.setHeader('Content-Type', 'text/html');
//     ////response.end('<h1>Hellloooooo</h1>')

    
    
// })

// server.listen(3000);