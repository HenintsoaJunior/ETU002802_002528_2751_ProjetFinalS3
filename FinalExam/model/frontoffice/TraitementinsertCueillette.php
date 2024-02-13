<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['dateCueillette'],$_POST['idCueilleurThe'], $_POST['idParcelleThe'],$_POST['poidsCueilli'])) {
    $dateCueillette = $_POST['dateCueillette'];
    $idCueilleurThe = $_POST['idCueilleurThe'];
    $idParcelleThe = $_POST['idParcelleThe'];
    $poidsCueilli = $_POST['poidsCueilli'];
    

    insertCueillette($conn,$dateCueillette, $idCueilleurThe, $idParcelleThe,$poidsCueilli);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
