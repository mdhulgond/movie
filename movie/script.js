const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})


//summery is below

/*
The provided JavaScript code is for a simple web application that fetches and displays movie information 
from The Movie Database (TMDb) API. Here's a breakdown of what the code does:

1) Constants are defined for the API URL, image path, and search API URL.
    a.API_URL is the URL to fetch a list of popular movies.
    b.IMG_PATH is the base URL for movie poster images.
    c.SEARCH_API is the URL to search for movies based on a query.

2)DOM elements are selected and stored in variables.
    a.main represents the main content area where movie information is displayed.
    b.form is the search form.
    c.search is the input field where users can enter search queries.


3)The getMovies function is defined. It takes a URL as a parameter, fetches movie data from the provided URL,
 and then calls the showMovies function to display the retrieved movies.

4)The showMovies function takes an array of movie objects as a parameter and displays them in the main element. 
 For each movie, it creates a div element with the movie's title, poster image, rating, and overview. The getClassByRate 
 function is used to determine the CSS class for the rating based on its value.

5)The getClassByRate function assigns a CSS class ('green', 'orange', or 'red') based on the movie's rating.

6)An event listener is added to the search form. When the form is submitted, it prevents the default form submission behavior. 
It then checks the value entered in the search input field. If a search term is provided, it calls the getMovies function with the 
search API URL and the query. If the search input is empty, the page is reloaded to display the initial popular movies.



In summary, this code fetches and displays a list of popular movies on the initial page load and allows users to search 
for movies by entering a query in the search input field. When a search term is submitted, it fetches and displays movies 
that match the query. */