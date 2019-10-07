const path = require('path')
const express = require('express');
const routes = require('./routes');

const app = express();

app.get('/health-check', (req, res) => { res.sendStatus(200) });
// app.get('/', (req, res) => {
//   home.getHome()
//     .then(data => { res.render('index', data) })
// });

app.use('/dist', express.static(path.join(__dirname, '/../dist')));
app.use(express.static(path.join(__dirname +'/../views/'))); //serves the index.html


app.use('/api', routes);

app.listen(3000);
