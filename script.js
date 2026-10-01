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

const boutonOngletMonstres = document.querySelector("#btnOngletMonstres");
const boutonOngletBoss = document.querySelector("#btnOngletBoss");
const ongletMonstres = document.querySelector("#ongletMonstres");
const ongletBoss = document.querySelector("#ongletBoss");

const popupMarchand = document.querySelector("#popupMarchand");
const boutonOuvrirMarchand = document.querySelector("#btnOuvrirMarchand");
const boutonFermerMarchand = document.querySelector("#btnFermerMarchand");

const fichePersonnage = document.querySelector("#fichePersonnage");

//easter
const portrait = document.querySelector("#portrait");
let clicsPortrait = 0;

function afficherPersonnage() {
    document.querySelector("#nomPersonnage").textContent = nom;
    document.querySelector("#classePersonnage").textContent = classe;
    document.querySelector("#forcePersonnage").textContent = force;
    document.querySelector("#magiePersonnage").textContent = magie;
    document.querySelector("#niveauPersonnage").textContent = niveau;
    document.querySelector("#piecePersonnage").textContent = piecesOr;
    document.querySelector("#clePersonnage").textContent = possedeCle ? "Oui" : "Non";
    document.querySelector("#chapeauPersonnage").textContent = possedeChapeau ? "Oui" : "Non";
    document.querySelector("#piecesMarchand").textContent = piecesOr;

    boutonCle.disabled = possedeCle;
    boutonChapeau.disabled = possedeChapeau;

    fichePersonnage.className = classe.toLowerCase();
}

function verifierPersonnage() {
    if (typeof (nom) !== "string" || typeof (force) !== "number" || typeof (magie) !== "number" || typeof (piecesOr) !== "number") {
        afficherMessage("Données du personnage non valides");
        return;
    } else if (force > 10 || force < 0 || piecesOr < 0) {
        afficherMessage("Statistiques non valides");
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
            afficherMessage("Vous possédez déjà une clé !");
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
            afficherMessage("Vous possédez déjà un chapeau !");
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
        afficherMessage("Vous n'êtes pas prêt à affronter le boss, il vous faut la clé !");
        return;
    }
    if (niveau < 20) {
        afficherMessage("Vous n'êtes pas prêt à affronter le boss, votre niveau est inférieur à 20 !");
        return;
    }
    afficherMessage("Vous avez battu le boss !");
    piecesOr += 10;
    possedeCle = false;
}

function chercherTresor() {
    if (localStorage.getItem("tresorTrouve") === "oui") {
        afficherMessage("Tu as déja trouvé l'easter, mais bien tenté...");
        return;
    }
    piecesOr += 100000000;
    localStorage.setItem("tresorTrouve", "oui");
    afficherMessage("Tiens ! Bob a trouvé une pièce sous son lit ! EASTER EGG ");
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

boutonOngletMonstres.addEventListener("click", function () {
    ongletMonstres.hidden = false;
    ongletBoss.hidden = true;
    boutonOngletMonstres.classList.add("actif");
    boutonOngletBoss.classList.remove("actif");
});

boutonOngletBoss.addEventListener("click", function () {
    ongletMonstres.hidden = true;
    ongletBoss.hidden = false;
    boutonOngletBoss.classList.add("actif");
    boutonOngletMonstres.classList.remove("actif");
});

boutonOuvrirMarchand.addEventListener("click", function () {
    popupMarchand.showModal();
});

boutonFermerMarchand.addEventListener("click", function () {
    popupMarchand.close();
});

portrait.addEventListener("click", function () {
    clicsPortrait += 1;
    if (clicsPortrait === 5) {
        clicsPortrait = 0;
        chercherTresor();
        afficherPersonnage();
    }
});

verifierPersonnage();

calculerNiveau();
calculerClasse();
afficherPersonnage();