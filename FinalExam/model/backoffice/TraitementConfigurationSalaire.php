<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['montant'],$_POST['poidsMinimal'],$_POST['bonus'],$_POST['mallus'],$_POST['id'])) {
    $montant = $_POST['montant'];
    $poidsMinimal = $_POST['poidsMinimal'];
    $bonus = $_POST['bonus'];
    $mallus = $_POST['mallus'];
    
    $id_salaireCueilleurThe = $_POST['id'];

    configurerSalaireCueilleur($conn,$montant,$poidsMinimal,$bonus,$mallus,$id_salaireCueilleurThe);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
