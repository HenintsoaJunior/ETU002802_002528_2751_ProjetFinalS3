CREATE OR REPLACE VIEW V_Global AS
SELECT 
    DATE_FORMAT(ct.dateCueillette, '%Y-%m') AS dateCueillette,
    ct.idParcelleThe,
    SUM(ct.poidsCueilli) AS poidsCueillis,
    ((((pr.surface * 10000) / vr.occupation) * vr.rendement) - SUM(ct.poidsCueilli)) AS poidsRestants,
    (SELECT montant FROM salaireCueilleurThe) * SUM(ct.poidsCueilli) AS prix_de_revient,
    COUNT(cr.id_cueilleurThe) AS nombre_cueillette
FROM 
    cueilletteThe ct
JOIN 
    cueilleurThe cr ON ct.idCueilleurThe = cr.id_cueilleurThe
JOIN 
    parcelleThe pr ON pr.id_parcelleThe = ct.idParcelleThe
JOIN 
    parcelleVarieteThe pvt ON pr.id_parcelleThe = pvt.idParcelleThe
JOIN 
    varieteThe vr ON vr.id_varieteThe = pvt.idVarieteThe
GROUP BY 
    DATE_FORMAT(ct.dateCueillette, '%Y-%m'), ct.idParcelleThe;

SELECT * FROM V_Global WHERE dateCueillette >= '2024-03-11' AND dateCueillette < '2024-04-11';

CREATE OR REPLACE VIEW v_listeSalaire AS
SELECT 
    c.dateCueillette,
    cu.nom AS cueilleur,
    s.montant AS salaire_base,
    s.bonus,
    s.mallus,
    c.poidsCueilli AS poids_recolte,
    CASE
        WHEN c.poidsCueilli >= s.poidsMinimal THEN
            (s.montant + s.bonus - s.mallus)
        WHEN c.poidsCueilli < s.poidsMinimal THEN
            (s.montant - ((s.poidsMinimal - c.poidsCueilli) * s.mallus))
    END AS paiement_total
FROM cueilletteThe c
JOIN cueilleurThe cu ON c.idCueilleurThe = cu.id_cueilleurThe
JOIN salaireCueilleurThe s ON cu.id_cueilleurThe = s.id_salaireCueilleurThe
ORDER BY c.dateCueillette;

CREATE OR REPLACE VIEW v_listeSalaire AS
SELECT 
    c.dateCueillette,
    cu.nom AS cueilleur,
    s.montant * c.poidsCueilli AS salaire_base,
    s.bonus,
    s.mallus,
    c.poidsCueilli AS poids_recolte,
    CASE
        WHEN c.poidsCueilli >= s.poidsMinimal THEN
            (s.montant + (s.bonus / 100) * s.montant - (s.mallus / 100) * s.montant)
        WHEN c.poidsCueilli < s.poidsMinimal THEN
            (s.montant - ((s.poidsMinimal - c.poidsCueilli) * (s.mallus / 100) * s.montant))
    END AS paiement_total
FROM cueilletteThe c
JOIN cueilleurThe cu ON c.idCueilleurThe = cu.id_cueilleurThe
JOIN salaireCueilleurThe s ON cu.id_cueilleurThe = s.id_salaireCueilleurThe
ORDER BY c.dateCueillette;


