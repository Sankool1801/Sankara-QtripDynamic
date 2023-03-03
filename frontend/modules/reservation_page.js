import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservation = config.backendEndpoint + "/reservations/";
    let res = await fetch(reservation);
    let data = await res.json();
    return data;
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //console.log(reservations);

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let reservationtableparent=document.getElementById("reservation-table-parent");
  let noreservationbanner=document.getElementById("no-reservation-banner");
  // Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
  // The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  if (reservations.length) {
    reservationtableparent.style.display = "block";
    noreservationbanner.style.display = "none";
  } else {
    reservationtableparent.style.display = "none";
    noreservationbanner.style.display = "block";
  }
  let tableElement = document.getElementById("reservation-table");
  reservations.forEach((ele) => {
    const newRow = tableElement.insertRow(-1);
    newRow.innerHTML = `
     <td><b>${ele.id}</b></td>
     <td>${ele.name}</td>
     <td>${ele.adventureName}</td>
     <td>${ele.person}</td>
     <td>${new Date(ele.date).toLocaleDateString("en-IN")}</td>
     <td>${ele.price}</td>
     <td>${new Date(ele.time)
       .toLocaleString("en-IN", {
         month: "long",
         day: "numeric",
         year: "numeric",
         hour: "numeric",
         minute: "numeric",
         second: "numeric",
       })
       .replace(" at", ",")}</td>
     <td id="${ele.id}"><a href="/frontend/pages/adventures/detail/?adventure=${
      ele.adventure
    }"
     class="reservation-visit-button" id="${
       ele.adventure
     }">Visit Adventure</a></td>
     `;
    //tableElement.append(newRow);
  });

  // Note:
  // 1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
  // 2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
}

export { fetchReservations, addReservationToTable };
