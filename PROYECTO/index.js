const express = require('express');
const port = process.env.PORT || 3000;
const user_router = require('./routes/user_routes.js');
const path = require('path');


const app = express();
app.use(express.json());

console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/HTML')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'));
});

app.use('/api/tarea', tarea_router);
app.use('/api/user', user_router);

app.listen(port, ()=>console.log("running  http://localhost:"+port))