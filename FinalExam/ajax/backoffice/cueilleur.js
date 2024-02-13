let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelector('.preview');


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
                if (pagetype === 'update') {
                    window.location.href = 'cueilleur.html';
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

function chargerListCueilleur() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListCueilleur(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListCueilleur.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createCueilleurTable(response) {
    const divListeVariete = document.getElementById('listeCueilleur');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>nom</th><th>sexe</th><th>dateNaissance</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.nom}</td><td>${item.sexe}</td><td>${item.dateNaissance}</td><td><button class="buttonUpdate">Update</button></td><td><button class="buttonDelete">Delete</button></td></tr>`;
        });

        tableHTML += '</tbody></table>';
        divListeVariete.innerHTML = tableHTML;

        // Ajouter un écouteur d'événements aux boutons "Update"
        const updateButtons = document.querySelectorAll('.buttonUpdate');
        updateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = Array.from(updateButtons).indexOf(button);
                showPreview(response[selectedIndex]);
            });
        });

        const deleteButtons = document.querySelectorAll('.buttonDelete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = Array.from(deleteButtons).indexOf(button);
            const id_cueilleurThes = response[selectedIndex].id_cueilleurThe;
            preparerDonneesDeleteCueilleur(id_cueilleurThes);
               
            });
        });

        
    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeVariete.innerHTML = '';
        divListeVariete.appendChild(errorElement);
    }
}

function showPreview(selectedItem) {
    preveiwContainer.style.display = 'flex';
    previewBox.classList.add('active');

    // Mettez à jour le contenu de la prévisualisation avec les détails du produit
    previewBox.innerHTML = `
        <i class="fas fa-times"></i>                           
        
        <form id="formUpdateCueilleur">
        <label for="noms">Nom :</label>
        <input type="text" id="noms" name="surface" value="${selectedItem.nom}" required><br><br>
        
        <label for="nom">sexe :</label>
        <input type="text" id="sexes" name="surface" value="${selectedItem.sexe}" required><br><br>
        
        <label for="nom">dateNaissance :</label>
        <input type="date" id="dateNaissances" name="surface" value="${selectedItem.dateNaissance}" required><br><br>
        
        
        <input type="submit" value="Update">
        </form>`;

    // Ajouter un gestionnaire d'événements à l'icône de fermeture
    const closeIcon = previewBox.querySelector('.fa-times');
    if (closeIcon) {
        closeIcon.onclick = () => {
            previewBox.classList.remove('active');
            preveiwContainer.style.display = 'none';
        };
    }

    const formInsertVariete = document.getElementById('formUpdateCueilleur');
    formInsertVariete.addEventListener('submit', function (event) {
        event.preventDefault();
        var nom = document.getElementById('noms').value;
        var sexe =document.getElementById('sexes').value;
        var dateNaissance = document.getElementById('dateNaissances').value;
        preparerDonneesListParcelle(nom,sexe,dateNaissance,selectedItem.id_cueilleurThe);
    });
}


function preparerDonneesListParcelle(nom,sexe,dateNaissance,id) {
    
    const formData = {
        nom:nom,
        sexe: sexe,
        dateNaissance:dateNaissance,
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementCueilleurUpdate.php', 'update');
}

function preparerDonneesDeleteCueilleur(id) {
    
    const formData = {
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementDeleteCueilleur.php', 'delete');
}


function displayListCueilleur(response) {
    createCueilleurTable(response);
}


function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesVariete();
}


function preparerDonneesVariete() {
    var nom = document.getElementById("nom").value;
    var sexe = document.getElementById("sexe").value;
    var dateNaissance = document.getElementById("dateNaissance").value;

    const formData = {
        nom: nom,
        sexe:sexe,
        dateNaissance:dateNaissance
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementinsertCueilleur.php', 'insertCueilleur');
}


function chargerListApresInsertion() {
    chargerListCueilleur();
}
chargerListCueilleur();

document.getElementById('formInsertCueilleur').addEventListener('submit', soumissionFormulaire);


