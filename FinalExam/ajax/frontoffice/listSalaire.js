
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

function envoyerFormulaireAuServeur(data, url, pagetype) {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = erreur;
        } else {
            console.log(response);
            if (response.success) {
                document.getElementById('success').textContent = 'Bien';
                
            } else {
                document.getElementById('error').textContent = 'Error Login or password ';
            }
        }
    }

    createXHR('POST', url, data, traiterReponse);
}

function genererChaineRequete(donnees) {
    const params = Object.entries(donnees)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return params;
}

function chargerListCueillette() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListCueillette(response);
        }
    }

    createXHR('GET', '../../model/frontoffice/TraitementListeSalaire.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createCueilleurTable(response) {
    const divListeVariete = document.getElementById('listSalaire');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>dateCueillette</th><th>cueilleur</th><th>salaire_base</th><th>bonus</th><th>mallus</th><th>poids_recolte</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.dateCueillette}</td><td>${item.cueilleur}</td><td>${item.salaire_base}</td><td>${item.bonus}</td><td>${item.mallus}</td><td>${item.poids_recolte}</td></tr>`;
        });

        tableHTML += '</tbody></table>';
        divListeVariete.innerHTML = tableHTML;

    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeVariete.innerHTML = '';
        divListeVariete.appendChild(errorElement);
    }
}


function displayListCueillette(response) {
    createCueilleurTable(response);
}



chargerListCueillette();