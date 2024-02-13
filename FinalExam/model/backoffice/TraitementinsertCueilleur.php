<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['nom'],$_POST['sexe'], $_POST['dateNaissance'])) {
    $nom = $_POST['nom'];
    $sexe = $_POST['sexe'];
    $dateNaissance = $_POST['dateNaissance'];
    

    insertCueilleur($conn,$nom, $sexe, $dateNaissance);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
