<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['categorie'],$_POST['id'])) {
    $categorie = $_POST['categorie'];
    $id = $_POST['id'];

    UpdateCategorie($conn,$categorie,$id);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
