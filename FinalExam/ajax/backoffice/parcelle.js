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
                    
                    window.location.href = 'parcelle.html';
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

function chargerListParcelle() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListParcelle(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListParcelle.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createParcelleTable(response) {
    const divListeVariete = document.getElementById('listeParcelle');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>id</th><th>surface</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.id_parcelleThe}</td><td>${item.surface}</td><td><button class="buttonUpdate">Update</button></td><td><button class="buttonDelete">Delete</button></td></tr>`;
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
            const id_parcelleThes = response[selectedIndex].id_parcelleThe;
            preparerDonneesDeletePartelle(id_parcelleThes);
               
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
        
        <form id="formUpdateVariete">
        <label for="nom">Nom :</label>
        <input type="text" id="surfaces" name="surfaces" value="${selectedItem.surface}" required><br><br>
        
        
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
        var surface = document.getElementById('surfaces').value;
        preparerDonneesListParcelle(surface,selectedItem.id_parcelleThe);
    });
}


function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesVariete();
}


function preparerDonneesListParcelle(surface,id) {
    
    const formData = {
        surface: surface,
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementParcelleUpdate.php', 'update');
}

function preparerDonneesVariete() {
    var surface = document.getElementById("surface").value;

    const formData = {
        surface: surface,
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementinsertParcelle.php', 'insertParcelle');
}

function preparerDonneesDeletePartelle(id) {
    
    const formData = {
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementDeleteParcelle.php', 'delete');
}

function displayListParcelle(response) {
    createParcelleTable(response);
}

function chargerListApresInsertion() {
    chargerListParcelle();
}
chargerListParcelle();

document.getElementById('formInsertParcelle').addEventListener('submit', soumissionFormulaire);


