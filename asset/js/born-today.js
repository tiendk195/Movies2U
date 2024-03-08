document.getElementById("getDataBtn").addEventListener("click", fetchData);

async function fetchData() {
  const url = "https://moviesverse1.p.rapidapi.com/get-born-today";
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

    if (data && data.list && data.list.length > 0) {
      displayData(data);
    } else {
      const today = new Date();
      const dayOfMonth = today.getDate();
      const dataContainer = document.getElementById("dataContainer");
      dataContainer.innerHTML = `Oops, Hôm nay không có nhân vật nào có ngày sinh nhật là ngày ${dayOfMonth}, hãy quay trở lại mai nhé.`;
      const paginationContainer = document.getElementById("pagination");
      paginationContainer.innerHTML = "";
    }
  } catch (error) {
    console.error(error);
  }
}
// document.oncontextmenu = () => {
//   return false;
// };
// document.onkeydown = (e) => {
//   if (e.key == "F12") {
//     return false;
//   }
//   if (e.ctrlKey && e.key == "u") {
//     return false;
//   }
// };

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
    behavior: "smooth",
  });
});

let currentPage = 1;
const itemsPerPage = 12;
let bornTodayData = [];

function displayData(data) {
  bornTodayData = data.list;
  displayPage(currentPage);
}

function displayPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const dataToShow = bornTodayData.slice(startIndex, endIndex);

  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = "";

  let row = null;
  dataToShow.forEach((item, index) => {
    if (index % 2 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-3");
      dataContainer.appendChild(row);
    }

    const col = document.createElement("div");
    col.classList.add("col-md-6");

    const card = createCard(item);

    col.appendChild(card);
    row.appendChild(col);
  });

  renderPaginationButtons();
}

function renderPaginationButtons() {
  const totalPages = Math.ceil(bornTodayData.length / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("btn", "btn-secondary", "mr-2");
    button.addEventListener("click", () => {
      currentPage = i;
      displayPage(currentPage);
    });
    paginationContainer.appendChild(button);
  }
}

function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.name;
  img.classList.add("card-img", "mb-3");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = item.name;

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
  cardSubtitle.textContent = item.birthDate;

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.innerHTML = `<strong>Categories:</strong> ${item.categories.join(
    ", "
  )}`;

  const infoText = document.createElement("p");
  infoText.classList.add("card-text");
  infoText.textContent = item.info.substring(0, 400);

  const showMoreButton = document.createElement("button");
  showMoreButton.classList.add("btn", "btn-link");
  showMoreButton.textContent = "Show more";
  showMoreButton.addEventListener("click", () => {
    if (showMoreButton.textContent === "Show more") {
      infoText.textContent = item.info;
      showMoreButton.textContent = "Show less";
    } else {
      infoText.textContent = item.info.substring(0, 400);
      showMoreButton.textContent = "Show more";
    }
  });

  card.appendChild(img);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(infoText);
  cardBody.appendChild(showMoreButton);

  return card;
}
