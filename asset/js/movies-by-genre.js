document.addEventListener("DOMContentLoaded", () => {
  const genreDropdown = document.getElementById("genreDropdown");
  const movieContainer = document.getElementById("movieContainer");
  const itemsPerPage = 15; // Số lượng phim hiển thị trên mỗi trang
  let currentPage = 1; // Trang hiện tại, mặc định là trang đầu tiên
  let movies = []; // Biến lưu trữ danh sách phim

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
      movies = data.movies; // Lưu danh sách phim từ API
      displayMovies(); // Hiển thị phim trên trang đầu tiên sau khi lấy dữ liệu
    } catch (error) {
      console.error(error);
    }
  });

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

  function displayMovies() {
    movieContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedMovies = movies.slice(startIndex, endIndex);

    // Iterate through displayed movies and display 3 movies per row
    for (let i = 0; i < displayedMovies.length; i += 3) {
      const row = document.createElement("div");
      row.classList.add("row", "mb-4");

      // Display up to 3 movies in each row
      for (let j = i; j < i + 3 && j < displayedMovies.length; j++) {
        const movie = displayedMovies[j];
        const col = document.createElement("div");
        col.classList.add("col-md-4");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "border", "rounded-3", "shadow");

        // Tạo phần tử card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Thêm thông tin của phim vào card body
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
        imdbRating.innerHTML = `<strong>Rating:</strong> ${movie.imdbRating}`;

        const posterImage = document.createElement("img");
        posterImage.classList.add("card-img-top");
        posterImage.src = movie.posterImage;
        posterImage.alt = movie.title;

        // Gắn các phần tử con vào card body
        cardBody.appendChild(title);
        cardBody.appendChild(year);
        cardBody.appendChild(timeline);
        cardBody.appendChild(description);
        cardBody.appendChild(imdbRating);

        // Gắn hình ảnh vào card
        card.appendChild(posterImage);
        card.appendChild(cardBody);

        // Gắn card vào cột
        col.appendChild(card);
        row.appendChild(col);
      }

      // Gắn dòng vào container chứa phim
      movieContainer.appendChild(row);
    }

    renderPaginationButtons();
  }
  function renderPaginationButtons() {
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    // Tạo nút chuyển trang cho mỗi trang
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.classList.add("btn", "btn-secondary", "mr-2");
      button.textContent = i;
      button.addEventListener("click", () => {
        currentPage = i;
        displayMovies(); // Hiển thị phim trên trang mới khi chuyển trang
      });
      paginationContainer.appendChild(button);
    }
  }
});
