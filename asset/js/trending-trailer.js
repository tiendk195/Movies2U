document.getElementById("fetchButton").addEventListener("click", fetchData);

async function fetchData() {
  const url = "https://moviesverse1.p.rapidapi.com/get-trending-trailers";
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
    displayTrailers(data.trailers);
  } catch (error) {
    console.error(error);
  }
}
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
function displayTrailers(trailers) {
  const trailersContainer = document.getElementById("trailersContainer");
  trailersContainer.innerHTML = "";

  trailers.forEach((trailer) => {
    const trailerElement = document.createElement("div");
    trailerElement.classList.add("trailer");

    const image = document.createElement("img");
    image.src = trailer.image;
    image.alt = trailer.title;

    const title = document.createElement("h3");
    title.textContent = trailer.title;

    const trailerLength = document.createElement("p");
    trailerLength.textContent = `Trailer Length: ${trailer.trailerLength}`;

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release Date: ${trailer.releaseDate}`;

    const videoLink = document.createElement("a");
    videoLink.href = trailer.videoLink;
    videoLink.innerHTML =
      '<button class="btn-watch-now-trailer">Watch Trailer</button>'; // Sử dụng HTML cho nút
    videoLink.target = "_blank";

    trailerElement.appendChild(image);
    trailerElement.appendChild(title);
    trailerElement.appendChild(trailerLength);
    trailerElement.appendChild(releaseDate);
    trailerElement.appendChild(videoLink);

    trailersContainer.appendChild(trailerElement);
  });
}
