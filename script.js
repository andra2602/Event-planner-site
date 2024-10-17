document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image-animation"); //selectez imaginile pentru slide show
    let index = 0;//asa retin indicele unei imagini

    function showImage() {
        images.forEach(image => image.style.display = "none"); //le ascund pe toate mai putin pe cea curenta
        images[index].style.display = "block";
        index = (index + 1) % images.length; //ciclarea imaginilor
        setTimeout(showImage, 2000); // Schimbă imaginea la fiecare 2 secunde
    }
    showImage();
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const formMessage = document.getElementById("form-message");

    // Verificăm dacă există deja date stocate în localStorage
    const savedData = localStorage.getItem("formData");
    if (savedData) {
        // Dacă există, încărcăm datele în formular
        const parsedData = JSON.parse(savedData);
        document.getElementById("name").value = parsedData.name;
        document.getElementById("email").value = parsedData.email;
        document.getElementById("telefon").value = parsedData.telefon;
        document.getElementById("subject").value = parsedData.subject;
        document.getElementById("message").value = parsedData.message;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Colectăm datele din formular
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            telefon: document.getElementById("telefon").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        // Validăm datele
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            formMessage.textContent = "Email invalid.";
            formMessage.style.color = "red";
            return;
        }

        // Validarea numărului de telefon (România)
        const telefonPattern = /^07\d{8}$/;
        if (!telefonPattern.test(formData.telefon)) {
            formMessage.textContent = "Număr de telefon invalid. Trebuie să fie în formatul 07xxxxxxxx.";
            formMessage.style.color = "red";
            return;
        }
        // Salvăm datele în localStorage
        localStorage.setItem("formData", JSON.stringify(formData));

        // Dacă validarea este reușită
        formMessage.textContent = "Formular trimis cu succes!";
        formMessage.style.color = "purple";

        // Resetăm formularul
        form.reset();
        localStorage.removeItem("formData");
    });
});


// Funcție pentru a genera o culoare aleatorie
function culoareAleatorie() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Selectează toate butoanele cu clasa "button"
const butoane = document.querySelectorAll('.button');

// Adaugă un ascultător de eveniment pe fiecare buton
butoane.forEach(button => {
    button.addEventListener('mouseenter', function() {
        // Generază o culoare aleatorie la plasarea cursorului pe buton
        const culoare = culoareAleatorie();
        // Aplică culoarea ca fundal pentru buton
        button.style.backgroundColor = culoare;
    });

    // Elimină culoarea personalizată când cursorul nu mai este pe buton
    button.addEventListener('mouseleave', function() {
        button.style.backgroundColor = ''; // Revenire la culoarea implicită
    });
});


// Setează intervalul în milisecunde după care să fie declanșată acțiunea
const interval = 60000; // de exemplu, 60000 ms = 1 minut

// Declanșează funcția pentru a reveni la începutul paginii
function scrollLaInceput() {
    window.scrollTo(0, 0); // Aceasta va face să te întorci la partea de sus a paginii
}

// Setează funcția pentru a fi apelată automat la fiecare interval
const intervalID = setInterval(scrollLaInceput, interval);

// Adaugă un ascultător pentru evenimentele care indică interacțiunea utilizatorului cu pagina
document.addEventListener('mousemove', resetInterval);
document.addEventListener('keypress', resetInterval);
document.addEventListener('scroll', resetInterval);

// Funcția care resetează intervalul atunci când utilizatorul interacționează cu pagina
function resetInterval() {
    clearInterval(intervalID); // Oprire intervalul anterior
    intervalID = setInterval(scrollLaInceput, interval); // Pornirea unui nou interval
}

////// creare si stergere de elemente - pt pozele de la locatii se adauga si se sterge un chenar
function modificareIncadrareImagine() {
    var imagini = document.querySelectorAll('.statica img');

    imagini.forEach(function(imagine) {
        imagine.addEventListener('mouseenter', function() {
            this.style.border = '4px solid purple'; // Adaugă chenarul când mouse-ul este pe imagine
        });

        imagine.addEventListener('mouseleave', function() {
            this.style.border = 'none'; // Șterge chenarul când mouse-ul este îndepărtat de pe imagine
        });
    });
}

modificareIncadrareImagine();



// Selectăm toate link-urile 
var linkuriLocatii = document.querySelectorAll('.section-center a');

// Iterăm prin fiecare link și adăugăm evenimentele de hover
linkuriLocatii.forEach(function(link) {
    link.addEventListener('mouseenter', function() {
        // Folosim getComputedStyle pentru a accesa stilurile calculate ale link-ului
        var computedStyle = window.getComputedStyle(link);
        var fontSize = computedStyle.fontSize;
        // Modificăm stilurile link-ului la hover
        link.style.fontSize = "1.2em"; // Facem fontul mai mare
        link.style.fontWeight = "bold"; // Facem textul mai îngroșat
    });

    link.addEventListener("mouseleave", function() {
        // Resetăm stilurile link-ului la valorile implicite atunci când mouse-ul părăsește link-ul
        link.style = ""; // Revenim la culoarea implicită a textului
        link.style.fontWeight = ""; // Revenim la greutatea fontului implicită
    });
});


document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Oprire comportamentul implicit al trimiterii formularului

    // Colectează valorile de utilizator și parolă din inputuri
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Trimite o cerere de tip POST la ruta /login cu datele de autentificare
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specifică tipul de conținut JSON
            },
            body: JSON.stringify({ username, password }) // Convertește datele în format JSON și le trimite
        });

        // Așteaptă răspunsul de la server și convertește răspunsul în format JSON
        const result = await response.json();
         // Verifică dacă cererea a fost reușită (status cod 200)
        if (response.ok) {
            alert(result.message); // Afișează mesajul de succes returnat de server
        } else {
            alert(result.message); // Afișează erorile în consolă în caz de eșec
        }
    } catch (error) {
        console.error('Error:', error);
        alert('O eroare a aparut.Va rugam sa reincercati!');
    }
});


document.getElementById('logoutButton').addEventListener('click', async function() {
    try {
        // Trimite o cerere de tip POST la ruta /logout pentru deconectare
        const response = await fetch('/logout', {
            method: 'POST',
        });

        const result = await response.json();
         // Verifică dacă cererea a fost reușită (status cod 200)
        if (response.ok) {
            alert(result.message);
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        } else {
            alert('Logout-ul a eșuat');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('O eroare a apărut. Te rugăm să încerci din nou mai târziu!');
    }
});

