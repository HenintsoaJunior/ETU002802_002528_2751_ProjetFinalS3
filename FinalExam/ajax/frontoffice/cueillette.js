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
                if (pagetype === 'cueillette') {
                    chargerListApresInsertion();
                    window.location.href("cueillette.html");
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

function chargerListCueillette() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListCueillette(response);
        }
    }

    createXHR('GET', '../../model/frontoffice/TraitementListeC.php', null, traiterReponse);
}

function chargerListCueilletteAff() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListCueilletteAff(response);
        }
    }

    createXHR('GET', '../../model/frontoffice/TraitementListeCueillette.php', null, traiterReponse);
}

function createCueilleurTable(response) {
    const divListeParcelle = document.getElementById('insertCueillette');

    if (response && response.listePartelle && response.listeCueilleur) {
        // Effacer le contenu précédent de divListeParcelle
        divListeParcelle.innerHTML = '';

        const dateCueilletteInput = '<label for="dateCueillette">Date Cueillette :</label>' +
        '<input type="date" id="dateCueillette" name="dateCueillette" required><br><br>';


        const selectHTMLParcelle = '<label for="selectParcelle">Parcelle : </label>' +
            '<select id="selectParcelle">' +
            response['listePartelle'].map(item => `<option value="${item.id_parcelleThe}">${item.id_parcelleThe}</option>`).join('') +
            '</select>';

        const selectHTMLCueilleur = '<label for="selectCueilleur">Cueilleur : </label>' +
            '<select id="selectCueilleur">' +
            response['listeCueilleur'].map(item => `<option value="${item.id_cueilleurThe}">${item.nom}</option>`).join('') +
            '</select>';

        // Ajout des champs de date et de poids cueilli
        const poidsCueilliInput = '<label for="poidsCueilli">Poids Cueilli :</label>' +
            '<input type="text" id="poidsCueilli" name="poidsCueilli" required><br><br>';

        // Création du bouton et ajout de l'événement au clic
        const insertButton = document.createElement('button');
        insertButton.textContent = 'Insérer';
        insertButton.addEventListener('click', function () {
            preparerDonneesCueillette(
                document.getElementById('dateCueillette').value,
                document.getElementById('selectCueilleur').value,
                document.getElementById('selectParcelle').value,              
                document.getElementById('poidsCueilli').value
            );
            
        });

        // Ajout des menus déroulants, des champs de date et de poids cueilli, et du bouton au divListeParcelle
        divListeParcelle.innerHTML = dateCueilletteInput+selectHTMLParcelle + '<br>' + selectHTMLCueilleur + '<br>'+ poidsCueilliInput;
        divListeParcelle.appendChild(insertButton);
    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeParcelle.innerHTML = '';
        divListeParcelle.appendChild(errorElement);
    }
}


function createCueilleurAffichage(response) {
    const divListeVariete = document.getElementById('listeCueillette');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>dateCueillette</th><th>idCueilleurThe</th><th>idParcelleThe</th><th>poidsCueilli</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.dateCueillette}</td><td>${item.idCueilleurThe}</td><td>${item.idParcelleThe}</td><td>${item.poidsCueilli}</td></tr>`;
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




function preparerDonneesCueillette(dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) {
    const formData = {
        dateCueillette:dateCueillette,
        idCueilleurThe: idCueilleurThe,
        idParcelleThe: idParcelleThe,
        poidsCueilli:poidsCueilli
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/frontoffice/TraitementinsertCueillette.php', 'insertCueillette');
}

function displayListCueillette(response) {
    createCueilleurTable(response);
}

function displayListCueilletteAff(response) {
    createCueilleurAffichage(response);
}

function chargerListApresInsertion() {
    chargerListCueilletteAff();
}

chargerListCueillette();
chargerListCueilletteAff();