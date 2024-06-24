const express = require('express');
const app = express();

//Middleware Function
const myMiddleware = (req, res, next) => {
    console.log('Time:', Date.now());
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    next();
}
const SERVER_PORT = 3000;

//Global Middleware
app.use(myMiddleware);
//Route Middleware
app.use("/query", (req, res, next) => {
    console.log('Query Middleware');
    next();
})

app.use(express.static(__dirname + '/views'));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

//Param Route
//localhost:3000/contact/pritesh/patel
app.get('/contact/:fnm/:lnm', (req, res) => {
    console.log(req.params);
    res.send('Contact Page: ' + req.params.fnm + ' ' + req.params.lnm);
})

//Query Route
//localhost:3000/query?fnm=pritesh&lnm=patel
app.get('/query', (req, res) => {
    console.log(req.query);
    res.send('Query Page: ' + req.query.fnm + ' ' + req.query.lnm);
})

// app.get('/index', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// });

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});