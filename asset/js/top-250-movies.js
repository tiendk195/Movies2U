document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchButton");
  fetchButton.addEventListener("click", fetchData);
  let moviesData = []; // Dữ liệu tất cả các bộ phim
  let currentPage = 1; // Trang hiện tại
  const moviesPerPage = 20; // Số bộ phim trên mỗi trang

  async function fetchData() {
    const url = "https://moviesverse1.p.rapidapi.com/top-250-movies";
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
      moviesData = data.movies;
      displayMovies(currentPage);
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
      // Scroll xuống một khoảng nào đó
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Xử lý khi click vào icon back to top
  document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt
    });
  });

  function displayMovies(page) {
    const movieListContainer = document.getElementById("movieList");
    movieListContainer.innerHTML = "";

    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;
    const moviesToShow = moviesData.slice(startIndex, endIndex);

    moviesToShow.forEach((movie, index) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("col-md-4");

      if (index % 3 === 0 && index !== 0) {
        movieCard.classList.add("mt-4");
      }

      const cardContent = `
        <div class="card">
          <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title font-weight-bold">${movie.title}</h5>
            <p class="card-text"><strong>Year:</strong> ${movie.year}</p>
            <p class="card-text"><strong>Timeline:</strong> ${movie.timeline}</p>
            <p class="card-text"><strong>Rating:</strong> ${movie.rating}</p>
          </div>
        </div>
      `;
      movieCard.innerHTML = cardContent;

      movieListContainer.appendChild(movieCard);
    });

    // Hiển thị nút chuyển trang nếu cần
    renderPaginationButtons();
  }

  function renderPaginationButtons() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(moviesData.length / moviesPerPage);

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-secondary", "mr-2");
        button.textContent = i;
        button.addEventListener("click", () => {
          currentPage = i;
          displayMovies(currentPage);
        });
        paginationContainer.appendChild(button);
      }
    }

    paginationContainer.appendChild(nextButton);
  }
});
