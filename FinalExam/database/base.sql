drop database the;
create database the;
use the;

drop view V_Global;
drop table saisieDepenseThe;
drop table cueilletteThe;
drop table loginUtilisateurThe;
drop table salaireCueilleurThe;
drop table categorieDepenseThe;
drop table cueilleurThe;
drop table parcelleVarieteThe;
drop table parcelleThe;
drop table varieteThe;
drop table loginAdminThe;

create table loginAdminThe(
    id_loginAdmin serial primary key,
    nom varchar(50) not null,
    dateNaissance date not null,
    sexe varchar(50) not null,
    email varchar(100) not null unique,
    motdepasse varchar(250) not null
);

create table varieteThe(
    id_varieteThe serial primary key,
    nom varchar(50) not null unique,
    occupation double precision,
    rendement double precision
);

create table parcelleThe( 
    id_parcelleThe serial primary key,
    surface double precision
);

create table parcelleVarieteThe(
    id_parcelleVarieteThe serial primary key,
    idParcelleThe int not null unique references parcelleThe(id_parcelleThe),
    idVarieteThe int not null references varieteThe(id_varieteThe)
);

create table cueilleurThe(
    id_cueilleurThe serial primary key,
    nom varchar(50) not null,
    sexe varchar(50) not null,
    dateNaissance date not null
);

create table categorieDepenseThe(
    id_categorieDepenseThe serial primary key,
    categorie varchar(50) not null unique
);

create table salaireCueilleurThe(
    id_salaireCueilleurThe serial primary key, 
    montant double precision,
    poidsMinimal double precision,
    bonus double precision,
    mallus double precision,
    dateSalaire date 
);
create table prixVenteThe
(
    id_prixVenteThe serial primary key,
    idVarieteThe int not null references varieteThe(id_varieteThe),
    prix double precision
);

create table loginUtilisateurThe(
    id_loginUtilisateurThe serial primary key,
    nom varchar(50) not null,
    dateNaissance date not null,
    sexe varchar(50) not null,
    email varchar(100) not null unique,
    motdepasse varchar(250) not null
);

create table cueilletteThe(
    id_cueilletteThe serial primary key,
    dateCueillette date not null,
    idCueilleurThe int not null references cueilleurThe(id_cueilleurThe),
    idParcelleThe int not null references parcelleThe(id_parcelleThe),
    poidsCueilli double precision
);

create table saisieDepenseThe(
    id_saisieDepenseThe serial primary key,
    dateSaisie date not null,
    idCategorieDepenseThe int not null references categorieDepenseThe(id_categorieDepenseThe),
    montant double precision
);

CREATE TABLE regenerationThe (
    id_regenerationThe serial PRIMARY KEY,
    mois VARCHAR(20) unique not null,
    valid int
);