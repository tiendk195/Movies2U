document.addEventListener("DOMContentLoaded", async () => {
  async function fetchData() {
    const url = "https://moviesverse1.p.rapidapi.com/upcoming-tv-shows";
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

  async function populateDropdownList() {
    const data = await fetchData();
    const dates = data.movies.map((tvShow) => tvShow.date);

    const dropdownList = document.getElementById("datesDropdown");
    dropdownList.innerHTML = "";
    dates.forEach((date) => {
      const option = document.createElement("option");
      option.text = date;
      dropdownList.add(option);
    });

    dropdownList.addEventListener("change", () => {
      const selectedDate = dropdownList.value;
      const selectedTVShow = data.movies.find(
        (tvShow) => tvShow.date === selectedDate
      );

      displayTVShows(selectedTVShow.list);
    });
  }

  function displayTVShows(tvShows) {
    const tvShowContainer = document.getElementById("tvShowContainer");
    tvShowContainer.innerHTML = "";

    for (let i = 0; i < tvShows.length; i += 2) {
      const tvShowRow = document.createElement("div");
      tvShowRow.classList.add("tv-show-row", "row", "mb-3");

      for (let j = i; j < i + 2 && j < tvShows.length; j++) {
        const tvShow = tvShows[j];

        const tvShowCol = document.createElement("div");
        tvShowCol.classList.add("col-md-6");

        const tvShowCard = document.createElement("div");
        tvShowCard.classList.add("tv-show-card");

        const image = document.createElement("img");
        image.classList.add("tv-show-image");
        image.src = tvShow.image;
        image.alt = tvShow.title;

        const title = document.createElement("h3");
        title.textContent = tvShow.title;

        const categories = document.createElement("p");
        categories.innerHTML = `<strong>Categories:</strong> ${tvShow.categories.join(
          ", "
        )}`;

        const starring = document.createElement("p");
        starring.innerHTML = `<strong>Starring in:</strong> ${tvShow.staring.join(
          ", "
        )}`;

        tvShowCard.appendChild(image);
        tvShowCard.appendChild(title);
        tvShowCard.appendChild(categories);
        tvShowCard.appendChild(starring);

        tvShowCol.appendChild(tvShowCard);
        tvShowRow.appendChild(tvShowCol);
      }

      tvShowContainer.appendChild(tvShowRow);
    }
  }

  populateDropdownList();
});
