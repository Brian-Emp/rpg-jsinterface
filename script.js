//creation du personnage
const nom = "Bob";
let force = 5;
let magie = 5;
let piecesOr = 0;

let niveau = force + magie;
let classe = "";
let possedeCle = false;
let possedeChapeau = false;

//marchand
let cle = 3;
let chapeau = 5;

//elments du DOM
const boutonFantome = document.querySelector("#btnFantome");
const boutonLoup = document.querySelector("#btnLoup");
const boutonPaladin = document.querySelector("#btnPaladin");
const boutonCle = document.querySelector("#btnCle");
const boutonChapeau = document.querySelector("#btnChapeau");
const boutonBoss = document.querySelector("#btnBoss");

function afficherPersonnage() {
    document.querySelector("#nomPersonnage").textContent = nom;
    document.querySelector("#classePersonnage").textContent = classe;
    document.querySelector("#forcePersonnage").textContent = force;
    document.querySelector("#magiePersonnage").textContent = magie;
    document.querySelector("#niveauPersonnage").textContent = niveau;
    document.querySelector("#piecePersonnage").textContent = piecesOr;
    document.querySelector("#clePersonnage").textContent = possedeCle ? "Oui" : "Non";
    document.querySelector("#chapeauPersonnage").textContent = possedeChapeau ? "Oui" : "Non";
}

function verifierPersonnage() {
    if (typeof (nom) !== "string" || typeof (force) !== "number" || typeof (magie) !== "number" || typeof (piecesOr) !== "number") {
        afficherMessage("Donnees du personnage non valides");
        return;
    } else if (force > 10 || force < 0 || piecesOr < 0) {
        afficherMessage("Specs non valides");
        return;
    }
}

function calculerNiveau() {
    niveau = force + magie;
}

function calculerClasse() {
    if (force > 0 && force >= (magie * 2)) {
        classe = "Guerrier";
    } else if (magie > 0 && magie >= (force * 2)) {
        classe = "Mage";
    } else {
        classe = "Aventurier";
    }
}

function battreAdversaire(adversaire) {
    if (adversaire !== "fantome" && adversaire !== "loup" && adversaire !== "paladin") {
        afficherMessage("Adversaire inconnu");
        return;
    }
    if (adversaire === "fantome") {
        magie += 1;
        piecesOr += 2;
    }
    if (adversaire === "loup") {
        force += 1;
        piecesOr += 2;
    }
    if (adversaire === "paladin") {
        force += 1;
        magie += 1;
        piecesOr += 1;
    }
    if (possedeChapeau === false) {
        if (force > 10) {
            force = 10;
        }
        if (magie > 10) {
            magie = 10;
        }
    }
    calculerNiveau();
    calculerClasse();
    afficherMessage("Vous avez battu un " + adversaire + " !");
}

function acheterObjet(objet) {
    if (objet !== "cle" && objet !== "chapeau") {
        afficherMessage("Objet inconnu");
        return;
    }
    if (objet === "cle") {
        if (possedeCle === true) {
            afficherMessage("Vous possedez deja une clé !");
            return;
        }
        if (piecesOr >= cle) {
            piecesOr -= cle;
            possedeCle = true;
            afficherMessage("Vous avez acheté une clé !");
        } else {
            afficherMessage("Vous n'avez pas assez de pièces d'or pour acheter une clé !");
        }
    }
    if (objet === "chapeau") {
        if (possedeChapeau === true) {
            afficherMessage("Vous possedez deja un chapeau !");
            return;
        }
        if (piecesOr >= chapeau) {
            piecesOr -= chapeau;
            possedeChapeau = true;
            afficherMessage("Vous avez acheté un chapeau !");
        } else {
            afficherMessage("Vous n'avez pas assez de pièces d'or pour acheter un chapeau !");
        }
    }
}

function battreBoss() {
    if (possedeCle === false) {
        afficherMessage("Vous etes pas pret a battre le boss, vous n'avez pas la clé !");
        return;
    }
    if (niveau < 20) {
        afficherMessage("Vous etes pas pret a battre le boss, votre niveau est inferieur a 20 !");
        return;
    }
    afficherMessage("Vous avez battu le boss !");
    piecesOr += 10;
    possedeCle = false;
}

function afficherMessage(message) {
    document.querySelector("#message").textContent = message;
}

boutonFantome.addEventListener("click", function () {
    battreAdversaire("fantome");

    afficherPersonnage();
});

boutonLoup.addEventListener("click", function () {
    battreAdversaire("loup");
    afficherPersonnage();
});

boutonPaladin.addEventListener("click", function () {
    battreAdversaire("paladin");
    afficherPersonnage();
});

boutonCle.addEventListener("click", function () {
    acheterObjet("cle");
    afficherPersonnage();
});

boutonChapeau.addEventListener("click", function () {
    acheterObjet("chapeau");
    afficherPersonnage();
});

boutonBoss.addEventListener("click", function () {
    battreBoss();
    afficherPersonnage();
});

verifierPersonnage();

calculerNiveau();
calculerClasse();
afficherPersonnage();