<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['nom'],$_POST['occupation'], $_POST['rendement'])) {
    $nom = $_POST['nom'];
    $occupation = $_POST['occupation'];
    $rendement = $_POST['rendement'];
    

    insertVariete($conn,$nom, $occupation, $rendement);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
