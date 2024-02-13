<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['nomRegister'],$_POST['emailRegister'], $_POST['passwordRegister'],$_POST['dateNaissance'],$_POST['sexe'])) {
    $nom = $_POST['nomRegister'];
    $dateNaissance = $_POST['dateNaissance'];
    $sexe = $_POST['sexe'];
    $email = $_POST['emailRegister'];
    $password = $_POST['passwordRegister'];

    insertPersonne($conn,$nom, $dateNaissance, $sexe,$email,$password);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
