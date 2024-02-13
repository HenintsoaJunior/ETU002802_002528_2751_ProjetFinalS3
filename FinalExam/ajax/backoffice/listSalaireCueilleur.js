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
                    window.location.href = 'listSalaireCueilleur.html';
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

function chargerListSalaireCueilleur() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListSalaireCueilleur(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListeSalaireCueilleur.php', null, traiterReponse);
}

// Fonction pour créer le tableau HTML
function createSalaireCueilleurTable(response) {
    const divListeCategorie = document.getElementById('listeSalaireCueilleur');

    if (Array.isArray(response)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>Salaire</th><th>poidsMinimal</th><th>bonus</th><th>mallus</th></tr></thead><tbody>';

        response.forEach(item => {
            tableHTML += `<tr><td>${item.montant}</td><td>${item.poidsMinimal}</td><td>${item.bonus}</td><td>${item.mallus}</td><td><button class="buttonConfigurer">Configurer</button></td></tr>`;
        });

        tableHTML += '</tbody></table>';
        divListeCategorie.innerHTML = tableHTML;

        const updateButtons = document.querySelectorAll('.buttonConfigurer');
        updateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = Array.from(updateButtons).indexOf(button);
                showPreview(response[selectedIndex]);
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
        
        <form id="formConfigureSalaireCueilleur">
        <label for="montant">Montant :</label>
        <input type="text" id="montant" name="montant" value="${selectedItem.montant}" required><br><br>
        <input type="text" id="poidsMinimal" name="montant" value="${selectedItem.poidsMinimal}" required><br><br>
        <input type="text" id="bonus" name="montant" value="${selectedItem.bonus}" required><br><br>
        <input type="text" id="mallus" name="montant" value="${selectedItem.mallus}" required><br><br>
        
        <input type="submit" value="Valider">
        </form>`;

    // Ajouter un gestionnaire d'événements à l'icône de fermeture
    const closeIcon = previewBox.querySelector('.fa-times');
    if (closeIcon) {
        closeIcon.onclick = () => {
            previewBox.classList.remove('active');
            preveiwContainer.style.display = 'none';
        };
    }

    const formInsertVariete = document.getElementById('formConfigureSalaireCueilleur');
    formInsertVariete.addEventListener('submit', function (event) {
        event.preventDefault();
        var montant = document.getElementById('montant').value;
        var poidsMinimal = document.getElementById('poidsMinimal').value;
        var bonus = document.getElementById('bonus').value;
        var mallus = document.getElementById('mallus').value;
        
        preparerDonneesListCategorie(montant,poidsMinimal,bonus,mallus,selectedItem.id_salaireCueilleurThe);
    });
}

function preparerDonneesListCategorie(montant,poidsMinimal,bonus,mallus,id) {
    
    const formData = {
        montant:montant,
        poidsMinimal:poidsMinimal,
        bonus:bonus,
        mallus:mallus,
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementConfigurationSalaire.php', 'update');
}


function displayListSalaireCueilleur(response) {
    createSalaireCueilleurTable(response);
}



chargerListSalaireCueilleur();