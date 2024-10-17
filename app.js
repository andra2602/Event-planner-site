const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = 3000;  ///http://localhost:3000/login.html

// Middleware pentru a permite cererile din orice origine (CORS)
app.use(cors({
  origin: "*",
}));

// Setarea directorului de vizualizare și a motorului de șabloane EJS
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

// Middleware pentru sesiuni
app.use(session({
  resave: false,
  secret: 'secret',
  saveUninitialized: true
}));

// Middleware pentru a analiza cererile JSON și URL-codate
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to handle URL-encoded data

// Middleware pentru a servi fișierele statice din directorul curent
app.use(express.static(path.join(__dirname)));

const users = {
  John : 'john1234',
  Alex : 'alex1234',
  Mary : 'mary1234'
};

// Ruta pentru pagina principală
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Ruta pentru pagina de autentificare
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});
// Ruta pentru gestionarea cererilor de autentificare
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body); // Afișează datele trimise prin cererea de autentificare
  if (users[username] && users[username] === password) {
    req.session.username = username; // Stabilește numele de utilizator în sesiune
    console.log(`Autentificare reusita pentru utilizatorul: ${username}`);
    return res.status(200).json({ message: `Felicitari! Bine ai revenit, ${username}!` });
  } else {
    console.log(`Autentificare eșuată pentru utilizatorul: ${username}`);
    res.status(401).json({ message: 'Autentificare esuata!Va rugam sa reincercati!' });
  }
});
// Ruta pentru gestionarea cererilor de deconectar
app.post('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Logout-ul a eșuat' });
      }
      return res.status(200).json({ message: 'Logout-ul a fost efectuat cu succes' });
    });
  } else {
    return res.status(401).json({ message: 'Nu sunteți autentificat' });
  }
});

// Ruta pentru obținerea informațiilor despre utilizatorul curent
app.get('/user', (req, res) => {
  if (req.session.username) {
    return res.status(200).json({ username: req.session.username });
  } else {
    return res.status(200).json(null);
  }
});
// Middleware pentru gestionarea rutelor care nu sunt găsite (eroare 404)
app.use((req, res, next) => {
  res.status(404).render('not-found.ejs', {
    name: "unknown",
    reasons: ["Ati introdus url-ul gresit", "Link-ul pentru acest site nu mai este valid!"]
  });
});
// Pornirea serverului și ascultarea pe portul specificat
app.listen(PORT, () => {
  console.log('A pornit serverul!!!');
});
