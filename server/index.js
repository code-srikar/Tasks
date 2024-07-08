const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const userauthenticationroute = require('./routes/userauthentication.router');
const taskroute = require('./routes/task.router');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

mongoose.connect(db_url)
    .then(console.log('Connected'))
    .catch(err => console.log(err))

// app.get('/', (req, res) => {
//     res.send("Hello");
// });

app.use('/api', userauthenticationroute);
app.use('/api/tasks', taskroute);
// app.use('/api/tasks', taskroute);

app.listen(port, () => console.log(`Server is running at ${port}`));