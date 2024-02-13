<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];


    $loginResult = checkLoginUser($conn, $email, $password);

    if ($loginResult) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Identifiants incorrects'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
