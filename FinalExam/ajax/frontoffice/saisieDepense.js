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
                console.log(pagetype);
                if (pagetype === 'insertD') {
                    chargerListApresInsertion();
                }
            } else {
                document.getElementById('error').textContent = 'Error ';
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

function chargerListSaisieDepense() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListSaisieDepense(response);
        }
    }

    createXHR('GET', '../../model/frontoffice/TraitementListeD.php', null, traiterReponse);
}

function chargerListSaisieDepenseAff() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListSaisieDepenseAff(response);
        }
    }

    createXHR('GET', '../../model/frontoffice/TraitementListsaisieDepenseThe.php', null, traiterReponse);
}



function createSaisieDepenseTable(response) {
    const divListeParcelle = document.getElementById('insertSaisieDepense');

    if (response && response.listeD) {
        // Effacer le contenu précédent de divListeParcelle
        divListeParcelle.innerHTML = '';

        const dateSaisieInput = '<label for="dateSaisie">dateSaisie :</label>' +
        '<input type="date" id="dateSaisie" name="dateSaisie" required><br><br>';


        const selectHTMCategorieDepenseThe = '<label for="selectDepenseThe">Depense : </label>' +
            '<select id="selectDepenseThe">' +
            response['listeD'].map(item => `<option value="${item.id_categorieDepenseThe}">${item.categorie}</option>`).join('') +
            '</select>';


        // Ajout des champs de date et de poids cueilli
        const montant = '<label for="montant">montant :</label>' +
            '<input type="text" id="montant" name="montant" required><br><br>';

        // Création du bouton et ajout de l'événement au clic
        const insertButton = document.createElement('button');
        insertButton.textContent = 'Insérer';
        insertButton.addEventListener('click', function () {
            preparerDonneesCueillette(
                document.getElementById('dateSaisie').value,
                document.getElementById('selectDepenseThe').value,
                document.getElementById('montant').value
            );
        });

        // Ajout des menus déroulants, des champs de date et de poids cueilli, et du bouton au divListeParcelle
        divListeParcelle.innerHTML = dateSaisieInput+selectHTMCategorieDepenseThe + '<br>' + montant + '<br>';
        divListeParcelle.appendChild(insertButton);
    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeParcelle.innerHTML = '';
        divListeParcelle.appendChild(errorElement);
    }
}




function preparerDonneesCueillette(dateSaisie,id_categorieDepenseThe,montant) {
    const formData = {
        dateSaisie:dateSaisie,
        id_categorieDepenseThe: id_categorieDepenseThe,
        montant: montant
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/frontoffice/TraitementInsertsaisieDepenseThe.php', 'insertD');
}

function createSaisieDepenseAffichage(response) {
    const divListeVariete = document.getElementById('TableausaisieDepense');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>dateSaisie</th><th>idCategorieDepenseThe</th><th>montant</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.dateSaisie}</td><td>${item.idCategorieDepenseThe}</td><td>${item.montant}</td></tr>`;
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



function displayListSaisieDepense(response) {
    createSaisieDepenseTable(response);
}

function displayListSaisieDepenseAff(response) {
    createSaisieDepenseAffichage(response);
}

function chargerListApresInsertion() {
    chargerListSaisieDepenseAff();
}

chargerListSaisieDepense();
chargerListSaisieDepenseAff();