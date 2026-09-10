import { trips } from "./data.js";
import { tickets } from "./data.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

let count = 0;
let newId = tickets.length;

for (let i = 0; i < tickets.length; i++) {
  let treject = null;

  for (let j = 0; j < trips.length; j++) {
    if (tickets[i].tripId === trips[j].id) {
      treject = trips[j];
    }
  }

  if (treject !== null) {
    treject.availableSeats--;
  }
}

const afficherTrajects = (datas) => {
  console.log("=== TRAJETS DISPONIBLES ===");
  datas.forEach((data) => {
    console.log(`
                #${data.id} ${data.departure} ---> ${data.destination}
                Départ: ${data.departureTime}
                Arrivée: ${data.arrivalTime}
                Price: ${data.price}DH
                Places disponibles : ${data.availableSeats}
                `);
  });
};

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

      let placeUsed = true;
      while (placeUsed) {
        placeUsed = false;
        for (let i = 0; i < tickets.length; i++) {
          if (
            tickets[i].tripId === trajet.id &&
            tickets[i].seatNumber === countSeat
          ) {
            placeUsed = true;
            countSeat++;
            break;
          }
        }
      }

      let ticketa = {
        id: newId,
        passengerName: nom,
        tripId: trajet.id,
        seatNumber: countSeat,
        price: trajet.price,
      };

      tickets.push(ticketa);
      console.log(`Ticket #${ticketa.id}
                     Passager: ${ticketa.passengerName}
                     Trajet: ${trajet.departure} ---> ${trajet.destination}
                     Place: ${ticketa.seatNumber}
                     Prix: ${ticketa.price}`);
      count++;
    } else {
      console.log("Place non pas disponcible!");
    }
  } else {
    console.log("trajet non pas disponcible!");
  }

  return count;
};

const afficherTicks = (ticks) => {
  console.log("=== TICKETS ===");
  ticks.forEach((ticke) => {
    const voyage = trips.find((trip) => trip.id === ticke.tripId);
    console.log(
      `Ticket #${ticke.id}
             Passager: ${ticke.passengerName}
             Trajet: ${voyage.departure} ----> ${voyage.destination},
             Place: ${ticke.seatNumber}
             Prix: ${ticke.price}DH`,
    );
  });
};

const annulerTicket = (tickets, indeTicket, count) => {
  let check = false;
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id === indeTicket) {
      check = true;
      const trip = trips.find((trip) => trip.id === tickets[i].tripId);
      tickets.splice(i, 1);

      if (trip) {
        trip.availableSeats++;
      }

      console.log("Ticket annulé avec succès.");

      count--;
      return count;
    }
  }

  if (check === false) {
    console.log("Ticket introuvable!!!!!");
  }
  return count;
};

const rechercherTicket = (tickets, rechercherTicket) => {
  let check = false;
  for (let i = 0; i < tickets.length; i++) {
    if (
      tickets[i].passengerName.toLowerCase() ===
      rechercherTicket.toLowerCase().trim()
    ) {
      check = true;
      const voyage = trips.find((trip) => trip.id === tickets[i].tripId);
      console.log(`
             Ticket #${tickets[i].id}
             Passager: ${tickets[i].passengerName}
             Trajet: ${voyage.departure} ----> ${voyage.destination},
             Place: ${tickets[i].seatNumber}
             Prix: ${tickets[i].price}DH
                `);
    }
  }

  if (check === false) {
    console.log("Ticket introuvable!!!!!!!");
  }
};

const filtrerTraject = (trajet, depart) => {
  let check = false;
  for (let i = 0; i < trajet.length; i++) {
    if (trajet[i].departure.toLowerCase() === depart.toLowerCase()) {
      check = true;
      console.log(` 
                ${trajet[i].departure} ----> ${trajet[i].destination}: ${trajet[i].price} DH
                `);
    }
  }

  if (check === false) {
    console.log("trajet introuvable!!!!!");
  }
};

const triTrajet = (trajet) => {
  let triTraj = [...trajet];
  for (let i = 0; i < triTraj.length; i++) {
    for (let j = i + 1; j < triTraj.length; j++) {
      if (triTraj[i].price > triTraj[j].price) {
        let swap = triTraj[j];
        triTraj[j] = triTraj[i];
        triTraj[i] = swap;
      }
    }
  }

  triTraj.forEach((traj) => {
    console.log(` 
                ${traj.departure} ----> ${traj.destination}: ${traj.price} DH
        `);
  });
};

const ticketsTotal = (tickets) => {
  let total = 0;
  for (let i = 0; i < tickets.length; i++) {
    total++;
  }

  return total;
};

const chifferDaffaire = (tickets) => {
  let somme = 0;
  for (let i = 0; i < tickets.length; i++) {
    somme += tickets[i].price;
  }

  return somme;
};

const trajetVendu = (tickets) => {
  let max = 0;
  let tripId = "";
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].seatNumber > max) {
      max = tickets[i].seatNumber;
      tripId = tickets[i].tripId;
    }
  }
  let tripfind = trips.find((trip) => trip.id === tripId);
  console.log(`***Trajet le plus vendu : 
                 ${tripfind.departure} --> ${tripfind.destination}
                 ${max} tickets vendus`);
};

const afficherTableau = () => {
  let choises;
  do {
    console.log("\n*****  RAILWAY MANAGER *****\n");

    console.log("1- Afficher les trajets");
    console.log("2- Acheter un ticket");
    console.log("3- Afficher les tickets");
    console.log("4- Annuler un ticket");
    console.log("5- Rechercher un ticket");
    console.log("6- Filtrer les trajets");
    console.log("7- Trier les trajets");
    console.log("8- Bonus — Statistiques");
    console.log("0- Quitter");
    console.log("");
    console.log("**************************************");

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
        const rechercherTicketByName = prompt(
          "Rechercher un ticket nom passage: ",
        );
        rechercherTicket(tickets, rechercherTicketByName);
        break;
      case 6:
        const depart = prompt("Enter Ville de départ: ");
        filtrerTraject(trips, depart);
        break;
      case 7:
        triTrajet(trips);
        break;
      case 8:
        let choises2;
        do {
          console.log("1- Afficher total ticket");
          console.log("2- Chiffre d'affaires total");
          console.log("3- Trajet le plus vendu");
          console.log("0- quetter");

          choises2 = parseInt(prompt("***Enter number choises: "));

          switch (choises2) {
            case 1:
              console.log(ticketsTotal(tickets));
              break;
            case 2:
              console.log(`${chifferDaffaire(tickets)}DH`);
              break;
            case 3:
              trajetVendu(tickets);
              break;
            case 0:
              console.log("Quetter");
              break;
            default:
              console.log(`****Number ${choises2} n'existe pas****`);
              break;
          }
        } while (choises2 !== 0);

        break;
      case 0:
        console.log("quetter");
        break;
      default:
        console.log(`****Number ${choises} n'existe pas****`);
        break;
    }
  } while (choises !== 0);
};

afficherTableau();
