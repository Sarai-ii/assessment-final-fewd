const selectMenu = document.querySelector("#titles")
const options = document.querySelector("option")
const displayInfo = document.querySelector("#display-info")
// review
const submitButton = document.querySelector("#review-submit")
const reviewList = document.querySelector("#review-list")
const form = document.querySelector("form")
const reviewInput = document.getElementById("review")
const resetButton = document.querySelector("#reset-reviews")
// people
const castList = document.getElementById("people")
const CastButton = document.getElementById("show-people")
let movieList = []

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
fetch("https://resource-ghibli-api.onrender.com/films/")
.then((response) => response.json())
.then((data) => {
const movies = data
// let currentMovie = null
// selectMenu.title
    populateSelectMovie(data)

// Movie Selector

selectMenu.addEventListener("change", (event) =>{
    for (const movie of movies) {
        if(movie.id === selectMenu.value)
            displayInfo.innerHTML= ` <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <p>${movie.description}</p>`
    }
})
// Reviews
submitButton.addEventListener ("click", (event) => {
    event.preventDefault()
    let review = reviewInput.value
        for (const movie of movies) {
            if(movie.id === selectMenu.value){
                let newReview = document.createElement("li")
                newReview.innerHTML = `<strong>${movie.title}: </strong>${review}`
                reviewList.append(newReview)
            }
        }
    form.reset()
}) 
resetButton.addEventListener("click", event => {
    event.preventDefault()
    reviewList.innerHTML = ""
    console.log(reviews)
})


})
.catch(error => {console.log(error)})
CastButton.addEventListener("click", event => {
    event.preventDefault()
    for (const movie of movieList) {
        if(movie.title === selectMenu.value){
            console.log("if working")
            if(movie.people.includes("/people/")){
                let cast = document.createElement("li")
                cast.innerHTML = `No Cast Found In This Api`
                castList.append(cast)
            } else {
                movie.people.forEach(castP => {
                    fetch(`https://resource-ghibli-api.onrender.com${castP}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.name)
                        let cast = document.createElement("li")
                        cast.innerHTML = `${data.name}`
                        castList.append(cast)
                    })
                })
            }

        }
    }
})

let populateSelectMovie = movies => {
    movieList.push(movies)
    movies.forEach(movie => {
        let newOption = document.createElement("option")
        newOption.value = movie.id
        newOption.textContent = movie.title
        selectMenu.append(newOption)
    })
}
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
