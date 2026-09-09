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
    let countSeat = 1;
  
    
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id == indeTrajet) {
                checkTrajet = true;
            if (trips[i].availableSeats > 0) {
                checkSetPlace = true;
                trajet = trips[i];
                trajet.availableSeats--;
                newId++;
            }
        }
    }


    if (checkTrajet == true) {
        if (checkSetPlace == true) {
            console.log(`***créer un ticket ${count + 1}***`);

            for (let i = 0; i < tickets.length; i++) {
                if (tickets[i].tripId === trajet.id) {
                    countSeat++;
                }
            }

        tickets.push({
            id: newId,
            passengerName: nom,
            tripId: trajet.id,
            seatNumber: countSeat,
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


const afficherTicks = (ticks) => {
    ticks.forEach(ticke => {
        const voyage = trips.find(trip => trip.id === ticke.tripId);
        console.log(
            `Ticket #${ticke.id}
             Passager: ${ticke.passengerName}
             Trajet: ${voyage.departure} ----> ${voyage.destination},
             Place: ${ticke.seatNumber}
             Prix: ${ticke.price}`
        )
    })
}

const annulerTicket = (tickets, indeTicket, count) => {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id === indeTicket) {

            const trip = trips.find(trip => trip.id === tickets[i].tripId);
            tickets.splice(i, 1);

            if (trip) {
                trip.availableSeats++;
            }

            console.log("Ticket annulé avec succès.");
            
            count--
            return count
        }
    }

    console.log("Ticket introuvable.");
    return count;
}

const rechercherTicket = (tickets, rechercherTicket) => {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].passengerName.toLowerCase() === rechercherTicket.toLowerCase()) {
            const voyage = trips.find(trip => trip.id === tickets[i].tripId);
            console.log(`
             Ticket #${tickets[i].id}
             Passager: ${tickets[i].passengerName}
             Trajet: ${voyage.departure} ----> ${voyage.destination},
             Place: ${tickets[i].seatNumber}
             Prix: ${tickets[i].price}
                `);
        }
    }
}

const filtrerTraject = (trajet, depart) => {
    for (let i = 0; i < trajet.length; i++) {
        if (trajet[i].departure.toLowerCase() === depart.toLowerCase()) {
            console.log(` 
                ${trajet[i].departure} ----> ${trajet[i].destination}: ${trajet[i].price} DH
                `)
        }
    }
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
        console.log("0- Quitter");

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
                afficherTicks(tickets);
                break;
            case 4:
                const indeTicket = parseInt(prompt("Identifiant du ticket : "));
                count = annulerTicket(tickets, indeTicket, count);
                break;
            case 5:
                const rechercherTicketByName = prompt("Rechercher un ticket nom passage: ");
                rechercherTicket(tickets, rechercherTicketByName);
                break;
            case 6:
                const depart = prompt("Enter Ville de départ: ");
                filtrerTraject(trips, depart);
                break;
            case 7:
                console.log("7- Trier les trajets: ");
                break;
            case 0:
                console.log("quetter");
                break;
            default:
                console.log(`****Number ${choises} n'existe pas****`)
        }
    } while (choises !== 0);
}

afficherTableau();
