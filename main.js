const selectMenu = document.querySelector("#titles")
const options = document.querySelector("option")
const displayInfo = document.querySelector("#display-info")
const submitButton = document.getElementById("input")
const reviewList = document.querySelector("#review-list")





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
fetch("https://resource-ghibli-api.onrender.com/films/")
.then((response) => response.json())
.then((data) => {
const movies = data
let currentMovie = null
    populateSelectMovie(data)
   
    selectMenu.addEventListener("change", (event) =>{

        for (const movie of movies) {
            if(movie.id === selectMenu.value)
            displayInfo.innerHTML= ` <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <p>${movie.description}</p>`
        }
    })


submitButton.addEventListener ("click", (event) =>{

    event.preventDefault()
    let newReview = document.createElement("li")
    newReview.innerHTML += `<strong>${currentMovie.title}</strong>` + " -- "
    newReview.innerHTML += commentInput.value
    commentList.append(newReview)

})

})
.catch(error => {console.log(error)})


let populateSelectMovie = movies => {
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
