<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['nom'],$_POST['sexe'], $_POST['dateNaissance'],$_POST['id'])) {
    $nom = $_POST['nom'];
    $sexe = $_POST['sexe'];
    $dateNaissance = $_POST['dateNaissance'];
    $id = $_POST['id'];

    updateCueilleur($conn,$nom, $sexe, $dateNaissance,$id);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
