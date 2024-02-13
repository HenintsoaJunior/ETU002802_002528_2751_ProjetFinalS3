function createXHR(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                callback(response, null); // Appel de la fonction de traitement avec la réponse
            } else {
                callback(null, 'Erreur de connexion au serveur'); // Gestion de l'erreur
            }
        }
    };

    xhr.send(data);
}


function genererChaineRequete(donnees) {
    const params = Object.entries(donnees)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return params;
}

function envoyerFormulaireAuServeur(data, url, pagetype) {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('errorLogin').textContent = erreur;
        } else {
            if (response.success) {
                document.getElementById('successLogin').textContent = 'Bien';
                console.log(pagetype);
                if (pagetype === 'register') {
                    window.location.href = 'index.html';
                } else if (pagetype === 'login') {
                    window.location.href = 'home.html';
                }
            } else {
                document.getElementById('errorLogin').textContent = 'Error Login or password ';
            }
        }
    }

    createXHR('POST', url, data, traiterReponse);
}

function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesLogin();
}

function soumissionFormulaireRegister(event) {
    event.preventDefault();
    preparerDonneesRegister();
}


function preparerDonneesLogin() {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const formData = {
        email: email,
        password: password,
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementLoginAdmin.php', 'login');
}

function preparerDonneesRegister() {
    const nom = document.getElementById('nomRegister').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const sexe= document.getElementById('sexe').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;

    const formData = {
        nomRegister: nom,
        dateNaissance:dateNaissance,
        sexe:sexe,
        emailRegister: email,
        passwordRegister: password,
    };

    const data = genererChaineRequete(formData);
    
    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementRegisterAdmin.php', 'register');
}

document.getElementById('formLogin').addEventListener('submit', soumissionFormulaire);
document.getElementById('formRegister').addEventListener('submit', soumissionFormulaireRegister);