<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listeCueilleur=ChargerListCueillette($conn);

    echo json_encode($listeCueilleur);
}

    
?>
