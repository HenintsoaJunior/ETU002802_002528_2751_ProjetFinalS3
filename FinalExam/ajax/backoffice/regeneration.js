

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
                if (pagetype === 'regeneration') {
                    window.location.href = 'regeneration.html';
                }
                else{
                    chargerListApresInsertion();
                }
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

function chargerListCategorie() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListCategorie(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListeRegeneration.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createCategorieTable(response) {
    const divListeCategorie = document.getElementById('regeneration');
    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>categorie</th></tr></thead><tbody>';
    
        response.forEach(item => {
            // Utilisez une classe unique pour chaque case à cocher et ajoutez un attribut data-mois pour stocker la valeur du mois
            let checkBoxHTML = `<input type="checkbox" name="check" class="checkBox" value="${item.id_regenerationThe}" ${item.valid == 1 ? 'checked' : ''}/>`;
            tableHTML += `<tr><td>${item.mois}${checkBoxHTML}</td></tr>`;
        });
    
        tableHTML += '</tbody></table>';
    
        // Ajouter la table au conteneur divListeCategorie
        divListeCategorie.innerHTML = tableHTML;
        
        // Ajouter un gestionnaire d'événements aux cases à cocher
        let checkers = document.querySelectorAll('.checkBox');
        checkers.forEach(checker => {
            checker.addEventListener('change', function() {
                // Récupérer la valeur de l'id_regenerationThe de la case à cocher sélectionnée
                const id_regenerationThe = this.value;
                preparerDonneesCategorie(id_regenerationThe);
            });
        });
    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeCategorie.innerHTML = '';
        divListeCategorie.appendChild(errorElement);
    }
}


function preparerDonneesCategorie(mois) {
    const formData = {
        mois: mois    
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementConfigurationRegeneration.php', 'regeneration');
}



function displayListCategorie(response) {
    createCategorieTable(response);
}


function chargerListApresInsertion() {
    chargerListCategorie();
}
chargerListCategorie();
//document.getElementById('formregeneration').addEventListener('submit', soumissionFormulaire);

