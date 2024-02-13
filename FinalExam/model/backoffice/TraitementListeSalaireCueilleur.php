<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listeCategorie=ChargerListSalaireCueilleur($conn);

    echo json_encode($listeCategorie);
}
    
?>
