document.addEventListener("DOMContentLoaded", async () => {
  async function fetchData() {
    const url = "https://moviesverse1.p.rapidapi.com/upcoming-movies";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "94c20f9b9cmsh1ba619fda7b3d93p1953d5jsn33de2389b05a",
        "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function populateDropdownList() {
    const data = await fetchData();
    const dates = data.movies.map((movie) => movie.date);

    const dropdownList = document.getElementById("datesDropdown");
    dropdownList.innerHTML = "";
    dates.forEach((date) => {
      const option = document.createElement("option");
      option.text = date;
      dropdownList.add(option);
    });

    dropdownList.addEventListener("change", () => {
      const selectedDate = dropdownList.value;
      const selectedMovie = data.movies.find(
        (movie) => movie.date === selectedDate
      );

      displayMovies(selectedMovie.list);
    });
  }

  function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = "";

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const image = document.createElement("img");
      image.classList.add("movie-image");
      image.src = movie.image;
      image.alt = movie.title;

      const title = document.createElement("h3");
      title.textContent = movie.title;

      const categories = document.createElement("p");
      categories.innerHTML = `<strong>Categories:</strong> ${movie.categories.join(
        ", "
      )}`;

      const starring = document.createElement("p");
      starring.innerHTML = `<strong>Starring in:</strong> ${movie.staring.join(
        ", "
      )}`;

      movieCard.appendChild(image);
      movieCard.appendChild(title);
      movieCard.appendChild(categories);
      movieCard.appendChild(starring);

      movieContainer.appendChild(movieCard);
    });
  }

  populateDropdownList();
});
