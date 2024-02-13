<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listeResultat=ChargerResultat($conn);

    echo json_encode($listeResultat);
}

    
?>
