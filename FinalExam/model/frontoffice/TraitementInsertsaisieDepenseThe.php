<?php
include '../conn/Connexion.php';
include '../frontoffice/Fonction.php';

$conn = conn(); // Assurez-vous que la fonction conn() retourne une connexion valide.

if (isset($_POST['dateSaisie'],$_POST['id_categorieDepenseThe'], $_POST['montant'])) {
    $dateSaisie = $_POST['dateSaisie'];
    $idCategorieDepenseThe = $_POST['id_categorieDepenseThe'];
    $montant = $_POST['montant'];
    
    InsertsaisieDepenseThe($conn,$dateSaisie, $idCategorieDepenseThe, $montant);
    echo json_encode(array('success' => true));
    
} else {
    echo json_encode(array('success' => false, 'message' => 'Données manquantes'));
}
?>
