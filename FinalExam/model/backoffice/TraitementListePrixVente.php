<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listePrixVente=ChargerListprixVenteThe($conn);

    echo json_encode($listePrixVente);
}

    
?>
