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

    // Iterate through movies and display 3 movies per row
    for (let i = 0; i < movies.length; i += 3) {
      const row = document.createElement("div");
      row.classList.add("row", "mb-4");

      // Display up to 3 movies in each row
      for (let j = i; j < i + 3 && j < movies.length; j++) {
        const movie = movies[j];
        const col = document.createElement("div");
        col.classList.add("col-md-4");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "border", "rounded-3", "shadow");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title", "fw-bold");
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
        imdbRating.innerHTML = `<strong>IMDb Rating:</strong> ${movie.imdbRating}`;

        const posterImage = document.createElement("img");
        posterImage.classList.add("card-img-top");
        posterImage.src = movie.posterImage;
        posterImage.alt = movie.title;

        cardBody.appendChild(title);
        cardBody.appendChild(year);
        cardBody.appendChild(timeline);
        cardBody.appendChild(description);
        cardBody.appendChild(imdbRating);

        card.appendChild(posterImage);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
      }

      movieContainer.appendChild(row);
    }
  }
});
