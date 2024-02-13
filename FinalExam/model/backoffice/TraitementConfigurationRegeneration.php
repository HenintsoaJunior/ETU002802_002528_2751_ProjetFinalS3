<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['mois'])) {
    $mois = $_POST['mois'];
    configurerRegeneration($conn,$mois);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
