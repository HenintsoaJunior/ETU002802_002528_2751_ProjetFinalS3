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
                    window.location.href = 'parcelleVariete.html';
                }
                else if(pagetype==='delete'){
                    window.location.href = 'parcelleVariete.html';
                }
                else{
                    window.location.href = 'parcelleVariete.html';
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

function chargerListParcelleVarieteAff() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListParcelleVarieteAff(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListePV.php', null, traiterReponse);
}

function createParcelleVarieteTable(response) {
    const divListeVariete = document.getElementById('listeParcelleVariete');

    if (response && response.listePartelleVariete && response.listePartelle && response.listeVariete && Array.isArray(response.listePartelle) && Array.isArray(response.listeVariete)) {
        let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>idParcelleThe</th><th>idVarieteThe</th></tr></thead><tbody>';

        response.listePartelleVariete.forEach((partelle, index) => {
            
            tableHTML += `<tr><td>${partelle.idParcelleThe}</td><td>${partelle.idVarieteThe}</td><td><button class="buttonUpdate">Update</button></td><td><button class="buttonDelete">Delete</button></td></tr>`;
        });

        tableHTML += '</tbody></table>';
        divListeVariete.innerHTML = tableHTML;

        // Ajouter un écouteur d'événements aux boutons "Update"
        const updateButtons = document.querySelectorAll('.buttonUpdate');
        updateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = Array.from(updateButtons).indexOf(button);
                showPreview(response.listePartelleVariete[selectedIndex], response.listePartelle[selectedIndex], response.listeVariete[selectedIndex],response);
            });
        });

        const deleteButtons = document.querySelectorAll('.buttonDelete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = Array.from(deleteButtons).indexOf(button);
            const id_parcelleVarieteThes = response.listePartelleVariete[selectedIndex].id_parcelleVarieteThe;
            preparerDonneesDeletePartelleVariete(id_parcelleVarieteThes);
               
            });
        });

    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeVariete.innerHTML = '';
        divListeVariete.appendChild(errorElement);
    }
}

function showPreview(listeParcelleVariete,listePartelle, listeVariete, response) {
    preveiwContainer.style.display = 'flex';
    previewBox.classList.add('active');

    // Récupérer les valeurs sélectionnées
    const selectedParcelle = listePartelle.id_parcelleThe;
    const selectedVariete = listeVariete.id_varieteThe;
    const selectParcelleVariete = listeParcelleVariete.id_parcelleVarieteThe;

    // Créer les options pour la liste des parcelles
    const optionsParcelle = response.listePartelle.map(item => `<option value="${item.id_parcelleThe}" ${listeParcelleVariete.idParcelleThe === item.id_parcelleThe ? 'selected' : ''}>${item.id_parcelleThe}</option>`).join('');

    // Créer les options pour la liste des variétés
    const optionsVariete = response.listeVariete.map(item => `<option value="${item.id_varieteThe}" ${listeParcelleVariete.idVarieteThe === item.id_varieteThe ? 'selected' : ''}>${item.nom}</option>`).join('');

    // Mettez à jour le contenu de la prévisualisation avec les détails du produit
    previewBox.innerHTML = `
    <i class="fas fa-times"></i>                           
    <form id="formUpdateParcelleVariete">
        <label for="selectParcelleU">Parcelle :</label>
        <select id="selectParcelleU">
            ${optionsParcelle}
        </select><br><br>

        <label for="selectVarieteU">Variété :</label>
        <select id="selectVarieteU">
            ${optionsVariete}
        </select><br><br>
    
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

    const formInsertVariete = document.getElementById('formUpdateParcelleVariete');
    formInsertVariete.addEventListener('submit', function (event) {
        event.preventDefault();
        var idParcelleThe = document.getElementById('selectParcelleU').value;
        var idVarieteThe = document.getElementById('selectVarieteU').value;
        preparerDonneesListVarieteAff(idParcelleThe, idVarieteThe, selectParcelleVariete);
    });
}



function preparerDonneesListVarieteAff(idParcelleThe,idVarieteThe,id) {
    
    const formData = {
        idParcelleThe: idParcelleThe,
        idVarieteThe:idVarieteThe,
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementParcelleVarieteUpdate.php', 'update');
}



function displayListParcelleVarieteAff(response) {
    createParcelleVarieteTable(response);
}

function chargerListParcelleVariete() {
    function traiterReponse(response, erreur) {
        if (erreur) {
            document.getElementById('error').textContent = 'Erreur de connexion au serveur';
        } else {
            displayListParcelleVariete(response);
        }
    }

    createXHR('GET', '../../model/backoffice/TraitementListePV.php', null, traiterReponse);
}

function createParcelleSelect(response) {
    const divListeParcelle = document.getElementById('InsertParcelleVariete');

    if (response && response.listePartelle && response.listeVariete) {
        // Effacer le contenu précédent de divListeParcelle
        divListeParcelle.innerHTML = '';

        const selectHTMLIdSurface = '<label for="selectParcelle">Parcelle : </label>' +
            '<select id="selectParcelle">' +
            response['listePartelle'].map(item => `<option value="${item.id_parcelleThe}">${item.id_parcelleThe}</option>`).join('') +
            '</select>';

        const selectHTMLIdNom = '<label for="selectVariete">Variété : </label>' +
            '<select id="selectVariete">' +
            response['listeVariete'].map(item => `<option value="${item.id_varieteThe}">${item.id_varieteThe}</option>`).join('') +
            '</select>';

        // Création du bouton et ajout de l'événement au clic
        const insertButton = document.createElement('button');
        insertButton.textContent = 'Insérer';
        insertButton.addEventListener('click', function() {
            preparerDonneesParcelleVariete(
                document.getElementById('selectParcelle').value,
                document.getElementById('selectVariete').value
            );
        });

        // Ajout des menus déroulants et du bouton au divListeParcelle
        divListeParcelle.innerHTML = selectHTMLIdSurface + '<br>' + selectHTMLIdNom + '<br>';
        divListeParcelle.appendChild(insertButton);
    } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Réponse invalide';
        divListeParcelle.innerHTML = '';
        divListeParcelle.appendChild(errorElement);
    }
}



function preparerDonneesParcelleVariete(idParcelleThe, idVarieteThe) {
    const formData = {
        idParcelleThe: idParcelleThe,
        idVarieteThe: idVarieteThe
    };

    const data = genererChaineRequete(formData);
    // console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementinsertParcelleVariete.php', 'insertParcelleVariete');
}

function preparerDonneesDeletePartelleVariete(id) {
    
    const formData = {
        id:id
    };

    const data = genererChaineRequete(formData);
    console.log(data);

    envoyerFormulaireAuServeur(data, '../../model/backoffice/TraitementDeleteParcelleVariete.php', 'delete');
}


function displayListParcelleVariete(response) {
    createParcelleSelect(response);
}

function chargerListApresInsertion() {
    chargerListParcelleVariete();

}

chargerListParcelleVariete();

chargerListParcelleVarieteAff();