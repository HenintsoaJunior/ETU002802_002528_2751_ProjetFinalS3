<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['idParcelleThe'],$_POST['idVarieteThe'])) {
    $idParcelleThe = $_POST['idParcelleThe'];
    $idVarieteThe = $_POST['idVarieteThe'];
    

    InsertparcelleVarieteThe($conn,$idParcelleThe, $idVarieteThe);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
