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
                    window.location.href = 'categorie.html';
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

    createXHR('GET', '../../model/backoffice/TraitementListeCategorie.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createCategorieTable(response) {
    const divListeCategorie = document.getElementById('listeCategorie');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>categorie</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.categorie}</td><td><button class="buttonUpdate">Update</button></td><td><button class="buttonDelete">Delete</button></td></tr>`;
        });

        tableHTML += '</tbody></table>';
        divListeCategorie.innerHTML = tableHTML;

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
            const idCategorieDepenseThe = response[selectedIndex].id_categorieDepenseThe;
            preparerDonneesDeleteCategorie(idCategorieDepenseThe);
               
            });
        });

    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeCategorie.innerHTML = '';
        divListeCategorie.appendChild(errorElement);
    }
}

function showPreview(selectedItem) {
    preveiwContainer.style.display = 'flex';
    previewBox.classList.add('active');

    // Mettez à jour le contenu de la prévisualisation avec les détails du produit
    previewBox.innerHTML = `
        <i class="fas fa-times"></i>                           
        
        <form id="formUpdatecategorie">
        <label for="categorie">categorie :</label>
        <input type="text" id="categories" name="surface" value="${selectedItem.categorie}" required><br><br>
          
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

    const formInsertVariete = document.getElementById('formUpdatecategorie');
    formInsertVariete.addEventListener('submit', function (event) {
        event.preventDefault();
        var categorie = document.getElementById('categories').value;
        preparerDonneesListCategorie(categorie,selectedItem.id_categorieDepenseThe);
    });
}

function preparerDonneesListCategorie(categorie,id) {
    
    const formData = {
        categorie:categorie,
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementCategorieUpdate.php', 'update');
}

function preparerDonneesDeleteCategorie(id) {
    
    const formData = {
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementDeleteCategorie.php', 'delete');
}


function displayListCategorie(response) {
    createCategorieTable(response);
}

function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesCategorie();
}


function preparerDonneesCategorie() {
    var categorie = document.getElementById("categorie").value;

    const formData = {
        categorie: categorie    
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementinsertCategorie.php', 'insertCategorie');
}

function chargerListApresInsertion() {
    chargerListCategorie();
}
chargerListCategorie();
document.getElementById('formInsertCategorie').addEventListener('submit', soumissionFormulaire);

