<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $listePartelle = ChargerListParcelle($conn);
    $listeVariete = ChargerListVariete($conn);
    $listePartelleVariete = ChargerListparcelleVarieteThe($conn);

    // Regrouper les données dans une seule structure de tableau
    $response = [
        'listeVariete' => $listeVariete,
        'listePartelle' => $listePartelle,
        'listePartelleVariete' =>$listePartelleVariete
    ];

    echo json_encode($response);
}
?>
