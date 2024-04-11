const inputText = document.getElementById("text");
const MovieContainer = document.getElementById("MovieContainer");
const paginationContainer = document.getElementById("paginationContainer");

const API_KEY = `dc22d0fe`;
const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=893a0a8`;

async function fetchMovies(page = 1) {
   window.scroll(0,0);

   if (inputText.value == "") {
      alert("Enter a Movie name in search box");
   }
   let respons = await fetch(`${BASE_URL}&s=${inputText.value}&page=${page}`);
   let data = await respons.json();
   console.log(data);
   const { Search, totalResults, Response } = data;
   console.log(Search, totalResults, Response);

   if(data.Response == "False"){
      MovieContainer.innerHTML = `No movies found for ${inputText.value}, please search for any other movie`;
   } 
   else{
      MovieContainer.innerHTML = "";

      let i = 1;
      Search.forEach((movie) => {
      let card = document.createElement("div");
      card.classList.add(
         "w-56",
         "h-96",
         "flex",
         "flex-col",
         "gap-3",
         "rounded-md",
         "shadow-2xl",
         "mb-20"
      );


      card.innerHTML = `
      <h1> <img src = ${movie.Poster} alt="movie Poster" </h1>
      <h1 class="text-wrap my-2">${i}. ${movie.Title}</h1> `;
      i++;
      MovieContainer.appendChild(card);
    });

    displayPagination(page, totalResults);
  }
}

let debounce = (fetchMovies, delay) => {
   let timer;

   return function () {
      timer && clearInterval(timer);
      timer = setTimeout(() => {
      fetchMovies();
      }, delay);
   };
};

function displayPagination(currentPage, totalResults){
   const totalPage = Math.ceil(totalResults / 10);
   paginationContainer.innerHTML = `
   <button onclick="fetchMovies(${currentPage - 1})" ${
      currentPage == 1 ? "disabled" : ""
   } class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Previous</button>
  <button class="text-2xl font-bold mx-5">${currentPage}</button>
  <button onclick="fetchMovies(${currentPage + 1})" ${
    currentPage == totalResults ? "disabled" : ""
  } class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>`;
}

document
   .getElementById("text")
   .addEventListener("input", debounce(fetchMovies, 300));


