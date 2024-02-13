<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listeSaisieDepense=ChargerListsaisieDepenseThe($conn);

    echo json_encode($listeSaisieDepense);
}

    
?>
