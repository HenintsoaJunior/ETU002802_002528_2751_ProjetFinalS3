<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['nom'],$_POST['occupation'], $_POST['rendement'],$_POST['id'])) {
    $nom = $_POST['nom'];
    $occupation = $_POST['occupation'];
    $rendement = $_POST['rendement'];
    $id = $_POST['id'];


    UpdateVariete($conn,$nom, $occupation, $rendement,$id);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
