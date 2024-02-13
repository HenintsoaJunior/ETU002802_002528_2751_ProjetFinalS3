<?php
include 'Connexion.php';
include 'Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['idvariete'], $_POST['prix'],$_POST['id'])) {
    $idvariete = $_POST['idvariete'];
    $prix = $_POST['prix'];
    $id = $_POST['id'];

    updateprixVenteThe($conns, $idvariete, $prix,$id);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
