<?php
include 'Connexion.php';
include 'Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    deleteprixVenteThe($conns,$id);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
