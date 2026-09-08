import {trips} from "./data.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const afficherTableau = () => {
    let choises;
    do {
        console.log("\n*****  RAILWAY MANAGER *****\n");

        console.log("1- Afficher les trajets: ");
        console.log("2- Acheter un ticket: ");
        console.log("3- Afficher les tickets: ");
        console.log("4- Annuler un ticket: ");
        console.log("5- Rechercher un ticket: ");
        console.log("6- Filtrer les trajets: ");
        console.log("7- Trier les trajets: ");
        console.log("0- Quitter: ");

        choises = parseInt(prompt("****Enter number choises: "));

        switch (choises) {
            case 1:
                console.log("1- Afficher les trajets: ");
                break;
            case 2:
                console.log("2- Acheter un ticket: ");
                break;
            case 3:
                console.log("3- Afficher les tickets: ");
                break;
            case 4:
                console.log("4- Annuler un ticket: ");
                break;
            case 5:
                break;
            case 6:
                console.log("6- Filtrer les trajets: ");
                break;
            case 7:
                console.log("7- Trier les trajets: ");
                break;
            default:
                console.log(`****Number ${choises} n'existe pas****`)
        }
    } while (choises !== 0);
}

afficherTableau();