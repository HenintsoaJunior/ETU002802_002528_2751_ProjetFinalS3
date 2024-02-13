<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['idVarieteThe'],$_POST['prix'])) {
    $idVariete = $_POST['idVarieteThe'];
    $prix = $_POST['prix'];

    insertPrixVenteThe($conn,$idVariete,$prix);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
