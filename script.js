import {trips} from "./data.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

let tickets = [];
let count = 0;
  let newId = 0;

const afficherTrajects = (datas) => {
       datas.forEach(data => {
            console.log(data);
       });
}

const acheterTicks = (tickets, nom, indeTrajet, count) => {
    let checkTrajet = false;
    let checkSetPlace = false;
    let trajet;
    let countPlace;;
  
    newId++;
    
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id == indeTrajet) {
                checkTrajet = true;
            if (trips[i].availableSeats > 0) {
                checkSetPlace = true;
                trajet = trips[i];
                trajet.availableSeats--;
                for (let j = 0; j < trajet.availableSeats.length; j++) {
                    countPlace += j;
                }
            }
        }
    }


    if (checkTrajet == true) {
        if (checkSetPlace == true) {
            console.log(`***créer un ticket ${count + 1}***`);

        tickets.push({
            id: newId,
            passengerName: nom,
            tripId: `${trajet.departure} -----> ${trajet.destination}`,
            seatNumber: countPlace ,
            price: trajet.price,
        });
        count++;
        } else {
            console.log("Place non pas disponcible!")
        }
    } else {
        console.log("trajet non pas disponcible!")
    }

    return count;

}


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
                afficherTrajects(trips);
                break;
            case 2:
                const nom = prompt("Nom du passager: ");
                const indeTrajet = parseInt(prompt("Identifiant du trajet: "));
                count = acheterTicks(tickets, nom, indeTrajet, count);
                break;
            case 3:
                console.log(tickets);
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