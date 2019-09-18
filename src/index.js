const app = require('express')();
const spotify = require('./spotify');
const shuffle = require('./shuffle');
const home = require('./home');

app.set('view engine', 'pug');
app.get('/health-check', (req, res) => { res.sendStatus(200) });
app.get('/', (req, res) => {
  home.getHome()
    .then(data => { res.render('index', data) })
});
app.get('/login', (req, res) => { res.redirect(spotify.getAuthorisationUrl()) });
app.get('/authorise', (req, res) => {
  spotify.authorise(req.query.code)
    .then(() => res.redirect('/'));
});
app.post('/shuffle', (req, res) => {
  shuffle.shufflePlaylist(req.query.id)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err);
      res.redirect('/error')
    });
});
app.get('/error', (req, res) => res.send('Oh no!!'))

app.listen(3000);
