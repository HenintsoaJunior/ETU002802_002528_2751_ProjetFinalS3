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
        const divListeVariete = document.getElementById('listeResultat');

        if (erreur) {
            document.getElementById('error').textContent = erreur;
        } else {
            console.log(response);

            // Vérifiez que la réponse est un tableau
            if (Array.isArray(response)) {
                document.getElementById('success').textContent = 'Bien';

                let tableHTML = '<table border="1" class="table table-dark table-striped"><thead><tr><th>dateCueillette</th><th>poidsCueillis</th><th>poidsRestants</th><th>prix_de_revient</th><th>nombre_cueillette</th></tr></thead><tbody>';

                response.forEach(item => {
                    tableHTML += `<tr><td>${item.dateCueillette}</td><td>${item.poidsCueillis}</td><td>${item.poidsRestants}</td><td>${item.prix_de_revient}</td><td>${item.nombre_cueillette}</td></tr>`;
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
    }

    createXHR('POST', url, data, traiterReponse);
}




function genererChaineRequete(donnees) {
    const params = Object.entries(donnees)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return params;
}


function soumissionFormulaire(event) {
    event.preventDefault();
    preparerDonneesResultatDate();
}


function preparerDonneesResultatDate() {
    var dateDebut = document.getElementById("dateDebut").value;
    var dateFin = document.getElementById("dateFin").value;

    const formData = {
        dateDebut: dateDebut,
        dateFin:dateFin
    };

    const data = genererChaineRequete(formData);
    
    envoyerFormulaireAuServeur(data, '../../model/frontoffice/TraitementResultatDate.php', 'resultatDate');
}


document.getElementById('FormResultat').addEventListener('submit', soumissionFormulaire);


