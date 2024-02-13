<?php 
function insertPersonne($conn,$nom,$dateNaissance, $sexe, $email, $password) {
    try {
        $query = "INSERT INTO loginUtilisateurThe (nom,dateNaissance, sexe,email,motdepasse) VALUES (:nom,:dateNaissance,:sexe,:email,:motdepasse)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':dateNaissance', $dateNaissance, PDO::PARAM_STR);
        $statement->bindParam(':sexe', $sexe, PDO::PARAM_STR);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->bindParam(':motdepasse', $password, PDO::PARAM_STR);

       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}


function checkLoginUser($conn, $email, $password)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM loginUtilisateurThe WHERE email = :email AND motdepasse = :password");
        
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        
        $stmt->execute();
        
        $check = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($check) {
            session_start();
            $_SESSION['user_id'] = $check['id_loginUtilisateurThe'];
        }

        return $check;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors de la vérification de connexion : ' . $e->getMessage());
    }
}

//cueillette

function ChargerListCueillette($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM cueilletteThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function updateCueillette($conn, $dateCueillette,$idCueilleurThe,$idParcelleThe,$poidsCueilli,$id) {
    try {
        $query = "UPDATE cueilletteThe SET dateCueillette = :dateCueillette,idCueilleurThe = :idCueilleurThe,idParcelleThe = :idParcelleThe,poidsCueilli= :poidsCueilli WHERE id = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':dateCueillette', $dateCueillette, PDO::PARAM_STR);
        $statement->bindParam(':idCueilleurThe', $idCueilleurThe, PDO::PARAM_STR);
        $statement->bindParam(':idParcelleThe', $idParcelleThe, PDO::PARAM_STR);
        $statement->bindParam(':poidsCueilli', $poidsCueilli, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

function insertCueillette($conn,$dateCueillette,$idCueilleurThe,$idParcelleThe,$poidsCueilli) {
    try {
        $query = "INSERT INTO cueilletteThe (dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) VALUES (:dateCueillette,:idCueilleurThe,:idParcelleThe,:poidsCueilli)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':dateCueillette', $dateCueillette, PDO::PARAM_STR);
        $statement->bindParam(':idCueilleurThe', $idCueilleurThe, PDO::PARAM_STR);
        $statement->bindParam(':idParcelleThe', $idParcelleThe, PDO::PARAM_STR);
        $statement->bindParam(':poidsCueilli', $poidsCueilli, PDO::PARAM_STR);
       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}


function InsertsaisieDepenseThe($conn,$dateSaisie,$idCategorieDepenseThe,$montant) {
    try {
        $query = "INSERT INTO saisieDepenseThe (dateSaisie,idCategorieDepenseThe,montant) VALUES (:dateSaisie,:idCategorieDepenseThe,:montant)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':dateSaisie', $dateSaisie, PDO::PARAM_STR);
        $statement->bindParam(':idCategorieDepenseThe', $idCategorieDepenseThe, PDO::PARAM_STR);
        $statement->bindParam(':montant', $montant, PDO::PARAM_STR);
       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}

function ChargerListsaisieDepenseThe($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM saisieDepenseThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function ChargerResultat($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM V_Global");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function ChargerResultatDate($conn,$dateDebut,$dateFin)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM V_Global where dateCueillette >= :dateDebut AND dateCueillette <= :dateFin");
        $stmt->bindParam(':dateDebut', $dateDebut, PDO::PARAM_STR);
        $stmt->bindParam(':dateFin', $dateFin, PDO::PARAM_STR);
        
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}
function ChargerListSalaire($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM v_listeSalaire");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

?>