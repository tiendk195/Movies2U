document.addEventListener("DOMContentLoaded", () => {
  const genreDropdown = document.getElementById("genreDropdown");
  const movieContainer = document.getElementById("movieContainer");

  genreDropdown.addEventListener("change", async () => {
    const selectedGenre = genreDropdown.value;
    const apiUrl = `https://moviesverse1.p.rapidapi.com/get-by-genre?genre=${selectedGenre}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "94c20f9b9cmsh1ba619fda7b3d93p1953d5jsn33de2389b05a",
          "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
        },
      });

      const data = await response.json();
      displayMovies(data.movies);
    } catch (error) {
      console.error(error);
    }
  });
  window.addEventListener("scroll", () => {
    const backToTopButton = document.querySelector(".back-to-top");
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt
    });
  });
  function displayMovies(movies) {
    movieContainer.innerHTML = "";

    const row = document.createElement("div");
    row.classList.add("row");

    movies.slice(0, 3).forEach((movie) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");

      const movieCard = document.createElement("div");
      movieCard.classList.add("card", "mb-3");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = movie.title;

      const year = document.createElement("p");
      year.classList.add("card-text");
      year.innerHTML = `<strong>Year:</strong> ${movie.year}`;

      const timeline = document.createElement("p");
      timeline.classList.add("card-text");
      timeline.innerHTML = `<strong>Timeline:</strong> ${movie.timeline}`;

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.innerHTML = `<strong>Description:</strong> ${movie.description}`;

      const imdbRating = document.createElement("p");
      imdbRating.classList.add("card-text");
      imdbRating.innerHTML = `<strong>Rating:</strong> ${movie.imdbRating}`;

      const posterImage = document.createElement("img");
      posterImage.classList.add("card-img-top");
      posterImage.src = movie.posterImage;
      posterImage.alt = movie.title;

      cardBody.appendChild(title);
      cardBody.appendChild(year);
      cardBody.appendChild(timeline);
      cardBody.appendChild(description);
      cardBody.appendChild(imdbRating);

      movieCard.appendChild(posterImage);
      movieCard.appendChild(cardBody);

      col.appendChild(movieCard);
      row.appendChild(col);
    });

    movieContainer.appendChild(row);
  }
});
