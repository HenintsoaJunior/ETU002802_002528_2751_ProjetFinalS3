
insert into loginAdminThe (nom,dateNaissance,sexe,email,motdepasse) values ("Admin","2004-12-12","Homme","admin@gmail.com","123");


insert into varieteThe (nom,occupation,rendement) values ("The Vert",1.8,15);
insert into varieteThe (nom,occupation,rendement) values ("The Rouge",1.8,15);


insert into parcelleThe (surface) values(5);
insert into parcelleThe (surface) values(2);


insert into parcelleVarieteThe (idParcelleThe,idVarieteThe) values(1,1);

insert into parcelleVarieteThe (idParcelleThe,idVarieteThe) values(2,1);



insert into cueilleurThe (nom,sexe,dateNaissance) values("Propla","Homme","2002-12-5");


insert into categorieDepenseThe (categorie) values("carburant");

insert into categorieDepenseThe (categorie) values("engrais");

insert into categorieDepenseThe (categorie) values("logistique");


insert into salaireCueilleurThe (montant,dateSalaire) values(1500,null);


insert into loginUtilisateurThe (nom,dateNaissance,sexe,email,motdepasse) values ("User","2004-12-12","Homme","user@gmail.com","123");


insert into cueilletteThe (dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) values("2024-02-12",1,1,100);
insert into cueilletteThe (dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) values("2024-02-13",1,1,200);

insert into cueilletteThe (dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) values("2024-02-12",1,2,100);
insert into cueilletteThe (dateCueillette,idCueilleurThe,idParcelleThe,poidsCueilli) values("2024-03-12",1,2,500);


insert into saisieDepenseThe (dateSaisie,idCategorieDepenseThe,montant) values("2024-02-12",1,15000);
insert into saisieDepenseThe (dateSaisie,idCategorieDepenseThe,montant) values("2024-02-12",2,20000);