import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  const params=new URLSearchParams(search);
  let cityName =  params.get("city");
  return cityName;
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{ 
  let cityEndpoint= config.backendEndpoint + "/adventures?city=" + city;
    // console.log(cityEndpoint);
      let res = await fetch(cityEndpoint);
      let data = await res.json();
      return data;
    } catch{
      return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let adventure=[];
  adventure=adventures.map((ele)=>{
    let rowElement=document.getElementById("data");
    let divElement=document.createElement("div");
    divElement.setAttribute("class","col-6 col-md-6 col-lg-3 mb-3");
    divElement.innerHTML= `
    <a href="detail/?adventure=${ele.id}" id="${ele.id}">
      <div class="activity-card">
      <img src=${ele.image}/>
      <div class="category-banner">${ele.category}</div>
      <div class="my-2 d-flex justify-content-between" style="width:90%">
        <p class="fw-bold">${ele.name}</p>
        <p>INR ${ele.costPerHead}</p>
      </div>
      <div class="mb-1 d-flex justify-content-between" style="width:90%">
      <p class="fw-bold">Duration</p>
      <p>${ele.duration} Hours</p>
      </div>
      </div>
    </a>
    `;
    rowElement.append(divElement);
    
});

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durationFilter = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].duration>=low && list[i].duration<=high) {
        durationFilter.push(list[i]);
    }
}
return durationFilter;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let categoryFilter = [];
  for (let i = 0; i < list.length; i++) {
    for(let j=0;j < categoryList.length;j++){
      if (list[i].category == categoryList[j]) {
        categoryFilter.push(list[i]);
      }
    }

    }
  return categoryFilter;

}
  



// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  let ans=filters.duration.split("-");
  let min1=ans[0];
  let max1=ans[1];
  //Filter by duration and category together
  if(filters.category.length && filters.duration.length){
    let firstFilter=filterByCategory(list,filters.category);
    let doubleFilter=filterByDuration(firstFilter,min1,max1);
    return doubleFilter;
  } 
  //Filter by category only
  else if(filters.category.length){
  let filteredArray=filterByCategory(list,filters.category);
  return filteredArray;
}
  //Filter by duration only
  else if(filters.duration.length){
    let durationFilteredArray=filterByDuration(list,min1,max1);
    return durationFilteredArray;
    }    
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  //filters={duration:"",category:[]};
  return localStorage.setItem('filters',JSON.stringify(filters));
  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  let data= localStorage.getItem('filters');
  if(data !== undefined) return JSON.parse(data);
  
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filter=[];

  filter=filters.category.map((ele)=>{
    let idElement=document.getElementById("category-list");
    let divElement=document.createElement("div");
    divElement.setAttribute("class","category-filter");
    divElement.innerText=ele;
    idElement.append(divElement);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
