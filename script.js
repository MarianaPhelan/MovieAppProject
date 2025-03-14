const apiKey = "1e70cb0c"; // OMDB API Key
const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const movieDetails = document.getElementById("movie-details");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", () =>{
    const movieTitle = movieInput.value.trim();
    if (movieTitle == ""){
        showError("Please enter a movie name.");
        return;
    }
    fetchMovie(movieTitle)
})

function fetchMovie(title)
{
    const apiUrl = `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`
    fetch(apiUrl)
    .then((response) =>{
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        return response.json();
    })
    .then((data) => {
        if(data.Response === "False"){
            throw new Error(data.Error);
        }
        displayMovie(data);
    })
    .catch((error) => showError(error.message));
}

function displayMovie(data)
{
    errorMessage.classList.add("hidden");
    movieDetails.classList.remove("hidden");

    document.getElementById("movie-poster").src = data.Poster;
    document.getElementById("movie-title").textContent = data.Title;
    document.getElementById("movie-year").textContent = data.Year;
    document.getElementById("rating").textContent = data.Rated;
    document.getElementById("movie-genre").textContent = data.Genre;
    document.getElementById("movie-plot").textContent = data.Plot;
}

function showError(message)
{
    movieDetails.classList.add("hidden");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}