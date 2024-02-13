<?php
include '../conn/Connexion.php';
include '../backoffice/Fonction.php';
$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['idParcelleThe'],$_POST['idVarieteThe'],$_POST['id'])) {
    $idParcelleThe = $_POST['idParcelleThe'];
    $idVarieteThe = $_POST['idVarieteThe'];
    $id = $_POST['id'];

    updateparcelleVarieteThe($conn,$idParcelleThe,$idVarieteThe,$id);
    
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
