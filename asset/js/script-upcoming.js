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
  document.oncontextmenu = () => {
    return false;
  };
  document.onkeydown = (e) => {
    if (e.key == "F12") {
      return false;
    }
    if (e.ctrlKey && e.key == "u") {
      return false;
    }
  };

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

      const categories = createTruncatedElement(
        "Categories",
        movie.categories.join(", ")
      );

      const starring = createTruncatedElement(
        "Starring in",
        movie.staring.join(", ")
      );

      movieCard.appendChild(image);
      movieCard.appendChild(title);
      movieCard.appendChild(categories);
      movieCard.appendChild(starring);

      movieContainer.appendChild(movieCard);
    });
  }

  function createTruncatedElement(label, text) {
    const container = document.createElement("div");
    container.classList.add("truncated-container");

    const labelElement = document.createElement("p");
    labelElement.innerHTML = `<strong>${label}:</strong> `;
    container.appendChild(labelElement);

    const textElement = document.createElement("p");
    textElement.classList.add("truncated-text");
    textElement.textContent = text.substring(0, 100); // Chỉ hiển thị 100 ký tự ban đầu

    const showMoreButton = document.createElement("span");
    showMoreButton.classList.add("show-more");
    showMoreButton.textContent = "Show more";
    showMoreButton.style.color = "blue"; // Màu chữ
    showMoreButton.style.cursor = "pointer"; // Biểu tượng "pointer"
    showMoreButton.addEventListener("click", () => {
      if (showMoreButton.textContent === "Show more") {
        textElement.textContent = text;
        showMoreButton.textContent = "Show less";
      } else {
        textElement.textContent = text.substring(0, 100);
        showMoreButton.textContent = "Show more";
      }
    });

    container.appendChild(textElement);
    container.appendChild(showMoreButton);

    return container;
  }

  populateDropdownList();
});
