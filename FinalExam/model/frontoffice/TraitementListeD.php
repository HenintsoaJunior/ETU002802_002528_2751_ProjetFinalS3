<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listeD = ChargerListCategorie($conn);

    // Regrouper les données dans une seule structure de tableau
    $response = [
        'listeD' => $listeD
    ];

    echo json_encode($response);
}
?>
