<?php
function insertPersonne($conn,$nom,$dateNaissance, $sexe, $email, $password) {
    try {
        $query = "INSERT INTO loginAdminThe (nom,dateNaissance, sexe,email,motdepasse) VALUES (:nom,:dateNaissance,:sexe,:email,:motdepasse)";
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

function checkLogin($conn, $email, $password)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM loginAdminThe WHERE email = :email AND motdepasse = :passworde");
        
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':passworde', $password);
        
        $stmt->execute();
        
        $check = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($check) {
            session_start();
            $_SESSION['user_id'] = $check['id_loginAdmin'];
        }

        return $check;
        
    } catch (PDOException $e) {
        // Gérer les erreurs PDO
        return array('error' => 'Erreur lors de la vérification de connexion : ' . $e->getMessage());
    }
}


function ChargerListVariete($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM varieteThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function insertVariete($conn,$nom,$occupation, $rendement) {
    try {
        $query = "INSERT INTO varieteThe (nom,occupation, rendement) VALUES (:nom,:occupation,:rendement)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':occupation', $occupation, PDO::PARAM_STR);
        $statement->bindParam(':rendement', $rendement, PDO::PARAM_STR);
        

       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}

function deleteVariete($conn, $idVariete) {
    try {
        $query = "DELETE FROM varieteThe WHERE id_varieteThe = :id_varieteThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id_varieteThe', $idVariete, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de suppression : " . $e->getMessage();
    }
}


function updateVariete($conn, $nom, $occupation, $rendement, $id) {
    try {
        $query = "UPDATE varieteThe SET nom = :nom, occupation = :occupation, rendement = :rendement WHERE id_varieteThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':occupation', $occupation, PDO::PARAM_STR);
        $statement->bindParam(':rendement', $rendement, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}


function insertParcelle($conn,$surface) {
    try {
        $query = "INSERT INTO parcelleThe (surface) VALUES (:surface)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':surface', $surface, PDO::PARAM_STR);
       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}

function deleteParcelle($conn,$id_parcelleThe) {
    try {
        $query = "DELETE FROM parcelleThe WHERE id_parcelleThe = :id_parcelleThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id_parcelleThe', $id_parcelleThe, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de suppression : " . $e->getMessage();
    }
}

function ChargerListParcelle($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM parcelleThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function updateParcelle($conn, $surface,$id) {
    try {
        $query = "UPDATE parcelleThe SET surface = :surface WHERE id_parcelleThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':surface', $surface, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

function InsertparcelleVarieteThe($conn,$idParcelleThe,$idVarieteThe) {
    try {
        $query = "INSERT INTO parcelleVarieteThe (idParcelleThe,idVarieteThe) VALUES (:idParcelleThe,:idVarieteThe)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':idParcelleThe', $idParcelleThe, PDO::PARAM_STR);
        $statement->bindParam(':idVarieteThe', $idVarieteThe, PDO::PARAM_STR);
        
       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}

function deleteparcelleVarieteThe($conn,$id_parcelleVarieteThe) {
    try {
        $query = "DELETE FROM parcelleVarieteThe WHERE id_parcelleVarieteThe = :id_parcelleVarieteThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id_parcelleVarieteThe', $id_parcelleVarieteThe, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de suppression : " . $e->getMessage();
    }
}

function ChargerListparcelleVarieteThe($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM parcelleVarieteThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function updateparcelleVarieteThe($conn, $idParcelleThe,$idVarieteThe,$id) {
    try {
        $query = "UPDATE parcelleVarieteThe SET idParcelleThe = :idParcelleThe,idVarieteThe= :idVarieteThe WHERE id_parcelleVarieteThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':idParcelleThe', $idParcelleThe, PDO::PARAM_INT);
        $statement->bindParam(':idVarieteThe', $idVarieteThe, PDO::PARAM_INT);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}


// cueilleur
function ChargerListCueilleur($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM cueilleurThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function updateCueilleur($conn, $nom,$sexe,$dateNaissance,$id) {
    try {
        $query = "UPDATE cueilleurThe SET nom = :nom,sexe = :sexe,dateNaissance = :dateNaissance WHERE id_cueilleurThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':sexe', $sexe, PDO::PARAM_STR);
        $statement->bindParam(':dateNaissance', $dateNaissance, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

function insertCueilleur($conn,$nom,$sexe,$dateNaissance) {
    try {
        $query = "INSERT INTO cueilleurThe (nom,sexe,dateNaissance) VALUES (:nom,:sexe,:dateNaissance)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':nom', $nom, PDO::PARAM_STR);
        $statement->bindParam(':sexe', $sexe, PDO::PARAM_STR);
        $statement->bindParam(':dateNaissance', $dateNaissance, PDO::PARAM_STR);
       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}

function deleteCueilleur($conn,$id_cueilleurThe) {
    try {
        $query = "DELETE FROM cueilleurThe WHERE id_cueilleurThe = :id_cueilleurThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id_cueilleurThe', $id_cueilleurThe, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de suppression : " . $e->getMessage();
    }
}


//cueillette


function insertCategorie($conn,$categorie) {
    try {
        $query = "INSERT INTO categorieDepenseThe (categorie) VALUES (:categorie)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':categorie', $categorie, PDO::PARAM_STR);
    
        

       
        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}


function updateCategorie($conn, $categorie, $id) {
    try {
        $query = "UPDATE categorieDepenseThe SET categorie = :categorie WHERE id_categorieDepenseThe = :id_categorieDepenseThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':categorie', $categorie, PDO::PARAM_STR);
       
        $statement->bindParam(':id_categorieDepenseThe', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

function deleteCategorie($conn,$id_categorieDepenseThe) {
    try {
        $query = "DELETE FROM categorieDepenseThe WHERE id_categorieDepenseThe = :id_categorieDepenseThe";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id_categorieDepenseThe', $id_categorieDepenseThe, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de suppression : " . $e->getMessage();
    }
}

function ChargerListCategorie($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM categorieDepenseThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}


function configurerSalaireCueilleur($conn, $montant,$poidsMinimal,$bonus,$mallus,$id_salaireCueilleurThe) {
    try {
        $query = "UPDATE salaireCueilleurThe SET montant = :montant,poidsMinimal = :poidsMinimal,bonus=:bonus,mallus=:mallus WHERE id_salaireCueilleurThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':montant', $montant, PDO::PARAM_STR);
        $statement->bindParam(':poidsMinimal', $poidsMinimal, PDO::PARAM_STR);
        $statement->bindParam(':bonus', $bonus, PDO::PARAM_STR);
        $statement->bindParam(':mallus', $mallus, PDO::PARAM_STR);
        $statement->bindParam(':id', $id_salaireCueilleurThe, PDO::PARAM_STR);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}
function ChargerListSalaireCueilleur($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM salaireCueilleurThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}

function insertPrixVenteThe($conn, $idVarieteThe, $prix) {
    try {
        $query = "INSERT INTO prixVenteThe (idVarieteThe, prix) VALUES (:idVarieteThe, :prix)";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':idVarieteThe', $idVarieteThe, PDO::PARAM_STR);
        $statement->bindParam(':prix', $prix, PDO::PARAM_STR);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur d'insertion : " . $e->getMessage();
    }
}


function updateprixVenteThe($conn,$idVarieteThe,$prix,$id) {
    try {
        $query = "UPDATE prixVenteThe SET idVarieteThe = :idVarieteThe,prix = :prix WHERE id_prixVenteThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':idVarieteThe', $idVarieteThe, PDO::PARAM_STR);
        $statement->bindParam(':prix', $prix, PDO::PARAM_STR);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}


function deleteprixVenteThe($conn,$id) {
    try {
        $query = "DELETE FROM prixVenteThe WHERE id_prixVenteThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id', $id, PDO::PARAM_STR);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

function ChargerListprixVenteThe($conn)
{
    try {
        $stmt = $conn->prepare("SELECT * FROM prixVenteThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
    } catch (PDOException $e) {
        return array('error' => 'Erreur lors du chargement des produits : ' . $e->getMessage());
    }
}
function configurerRegeneration($conn, $id) {
    try {
        // Récupérer la valeur actuelle de 'valid'
        $currentValidValue = getCurrentValidValue($conn, $id);

        // Calculer la nouvelle valeur de 'valid'
        $newValidValue = ($currentValidValue == 1) ? 0 : 1;

        // Mettre à jour la base de données avec la nouvelle valeur de 'valid'
        $query = "UPDATE regenerationThe SET valid = :valid WHERE id_regenerationThe = :id and valid = :currentValid";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':valid', $newValidValue, PDO::PARAM_INT);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->bindParam(':currentValid', $currentValidValue, PDO::PARAM_INT);

        $statement->execute();

    } catch (PDOException $e) {
        echo "Erreur de mise à jour : " . $e->getMessage();
    }
}

// Fonction pour obtenir la valeur actuelle de 'valid'
function getCurrentValidValue($conn, $id) {
    try {
        $query = "SELECT valid FROM regenerationThe WHERE id_regenerationThe = :id";
        $statement = $conn->prepare($query);

        // Liaison des paramètres
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();

        // Récupérer la valeur actuelle de 'valid'
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        return ($result !== false) ? $result['valid'] : null;

    } catch (PDOException $e) {
        echo "Erreur lors de la récupération de la valeur actuelle de 'valid' : " . $e->getMessage();
    }
}

function chargerListRegeneration($conn){
    try {
        $stmt = $conn->prepare("SELECT * FROM regenerationThe");
        $stmt->execute();
        $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $produits;
        

    } catch (PDOException $e) {
        echo "Erreur de Listage : " . $e->getMessage();
    }
}



?>