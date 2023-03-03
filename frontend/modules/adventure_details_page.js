import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  console.log(search);
  let adventureId = params.get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventureDetail =
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
    let res = await fetch(adventureDetail);
    let data = await res.json();
    return data;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //let adventureDetail=[];
  let heading = document.getElementById("adventure-name");
  heading.textContent = adventure.name;

  let subTitle = document.getElementById("adventure-subtitle");
  subTitle.textContent = adventure.subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  console.log(adventure);
  for (let i = 0; i < adventure.images.length; i++) {
    let image = document.createElement("img");
    image.src = adventure.images[i];
    image.setAttribute("class", "activity-card-image");
    photoGallery.append(image);
  }

  let content = document.getElementById("adventure-content");
  content.innerText = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carouselIndicators = "";
  let carouselItem = "";
  for (let i = 0; i < images.length; i++) {
    carouselIndicators += `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${
      i === 0
        ? 'class="active" aria-current="true"'
        : 'aria-label="Slide' + (i + 1) + '"'
    }></button>
  `;
    carouselItem += `
<div class="carousel-item ${i === 0 ? "active" : ""}">
  <img src="${images[i]}" class="d-block activity-card-image" alt="...">
</div>
  `;
  }
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    ${carouselIndicators};
  </div>
  <div class="carousel-inner">
    ${carouselItem};
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure);
  let costperson = document.getElementById("reservation-person-cost");
  costperson.innerHTML = adventure.costPerHead;

  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  //console.log(persons);
  let total = document.getElementById("reservation-cost");
  total.innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(presentAdventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.elements["name"].value;
    const date = form.elements["date"].value;
    const person = form.elements["person"].value;
    const adventure = presentAdventure.id;
    const data = { name, date, person, adventure };
    const jsondata = JSON.stringify(data);
    const url = config.backendEndpoint + "/reservations/new";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: jsondata,
      });
      if (response.ok) {
        alert("Success!");
        location.reload();
      } else {
        alert("Failed!");
      }
    } catch (error) {
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display =
      "block";
  } else {
    document.getElementById("reserved-banner").style.display =
      "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
