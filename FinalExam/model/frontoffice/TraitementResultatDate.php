<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';
$conn = conn();

if (isset($_POST['dateDebut'],$_POST['dateFin'])) {
$dateDebut = $_POST['dateDebut'];
$dateFin = $_POST['dateFin'];
$listeResultat=ChargerResultatDate($conn,$dateDebut,$dateFin);

echo json_encode($listeResultat);

}
?>
