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
                    
                    window.location.href = 'variete.html';
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

function chargerListVariete() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListVariete(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListeVariete.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createVarieteTable(response) {
    const divListeVariete = document.getElementById('listeVariete');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>Nom</th><th>Occupation</th><th>Rendement</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.nom}</td><td>${item.occupation}</td><td>${item.rendement}</td><td><button class="buttonUpdate">Update</button></td><td><button class="buttonDelete">Delete</button></td></tr>`;
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
            const id_varieteThes = response[selectedIndex].id_varieteThe;
            preparerDonneesDeleteVariete(id_varieteThes);
               
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
        <i class="fas fa-times">X</i>                           
        
        <form id="formUpdateVariete">
        <label for="nom">Nom :</label>
        <input type="text" id="noms" name="nom" value="${selectedItem.nom}" required><br><br>
        
        <label for="occupation">Occupation :</label>
        <input type="number" id="occupations" name="occupation" value="${selectedItem.occupation}" step="0.01" required><br><br>
        
        <label for="rendement">Rendement :</label>
        <input type="number" id="rendements" name="rendement" value="${selectedItem.rendement}" step="0.01" required><br><br>
        
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

    const formInsertVariete = document.getElementById('formUpdateVariete');
    formInsertVariete.addEventListener('submit', function (event) {
        event.preventDefault();
        var nom = document.getElementById('noms').value;
        var occupation = document.getElementById('occupations').value;
        var rendement = document.getElementById('rendements').value;
        preparerDonneesListVariete(nom,occupation,rendement,selectedItem.id_varieteThe);
    });
}


function preparerDonneesListVariete(nom,occupation,rendement,id) {
    
    const formData = {
        nom: nom,
        occupation: occupation,
        rendement,rendement,
        id,id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementVarieteUpdate.php', 'update');
}



function displayListVariete(response) {
    createVarieteTable(response);
}

function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesVariete();
}


function preparerDonneesVariete() {
    var nom = document.getElementById("nom").value;
    var occupation = document.getElementById("occupation").value;
    var rendement = document.getElementById("rendement").value;

    const formData = {
        nom: nom,
        occupation:occupation,
        rendement:rendement
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementinsertVariete.php', 'insertVariete');
}
function preparerDonneesDeleteVariete(id) {
    
    const formData = {
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementDeleteVariete.php', 'delete');
}


function chargerListApresInsertion() {
    chargerListVariete();
}
chargerListVariete();

document.getElementById('formInsertVariete').addEventListener('submit', soumissionFormulaire);

