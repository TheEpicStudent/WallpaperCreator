// server.js
// AI usage: none


const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const prompt = require('prompt-sync')();
const server = http.createServer(app);

const { readFileSync } = require('fs');
const PORT = 8080;

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const filepath = path.join(__dirname, 'public', 'index.html');
    res.end(readFileSync(filepath));
});
app.get('/creator', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const filepath = path.join(__dirname, 'public', 'creator.html');
    res.end(readFileSync(filepath));
    
});


server.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}`);
    console.log('--------------------------------');
});
