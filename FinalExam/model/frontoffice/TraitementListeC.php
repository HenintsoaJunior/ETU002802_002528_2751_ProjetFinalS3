<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listePartelle = ChargerListParcelle($conn);
    $listeCueilleur = ChargerListCueilleur($conn);

    // Regrouper les données dans une seule structure de tableau
    $response = [
        'listeCueilleur' => $listeCueilleur,
        'listePartelle' => $listePartelle
    ];

    echo json_encode($response);
}
?>
