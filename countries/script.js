const ALL_URL = "https://restcountries.eu/rest/v2/all";
const SEARCH_API = "https://restcountries.eu/rest/v2/name/";
const FILTER = "?fields=name;capital;borders;alpha3Code;";

const form = document.getElementById("search-bar");
const search = document.getElementById("search");
const main = document.querySelector("main");
// to store all countries
const dict = {};
init();

//initial function to load all capitals of all countries
async function init() {
  all = await getCountries(ALL_URL + FILTER);
  all.forEach((country) => {
    const { name, capital, borders, alpha3Code } = country;
    dict[alpha3Code] = capital;
  });
  console.log("All countries data logged");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    results = await getCountries(SEARCH_API + searchTerm + FILTER);
    showCountries(results);
  } else {
    window.location.reload();
  }
});

//display countries on DOM
function showCountries(countries) {
  main.innerHTML = "";

  countries.forEach((country) => {
    const { name, capital, borders, alpha3Code } = country;
    const country_ele = document.createElement("div");
    country_ele.classList.add("country");

    country_ele.innerHTML = `
    <div class = "row"><h3 class="countryName">${name}</h3>
    <span>${capital}</span></div>
    <h4>Neighbour Capitals:</h4>`;

    const ul = document.createElement("ul");
    ul.setAttribute("id", "borders");

    borders.forEach((bord) => {
      const li = document.createElement("li");
      li.innerHTML = `${dict[bord]}`;
      ul.appendChild(li);
    });

    country_ele.appendChild(ul);
    main.appendChild(country_ele);
  });
}

async function getCountries(url) {
  //   const res = await fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Not 2xx error");
  //       } else {
  //         return response;
  //       }
  //     })
  //     .catch((err) => console.error(err));

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
