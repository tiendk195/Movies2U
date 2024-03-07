// born-today.js
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
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

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
function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.innerHTML = "";

  let row = null;
  let count = 0;

  data.list.forEach((item, index) => {
    if (count === 0 || count % 2 === 0) {
      row = document.createElement("div");
      row.classList.add("row", "mb-3");
      dataContainer.appendChild(row);
    }

    const col = document.createElement("div");
    col.classList.add("col-md-6");

    const card = createCard(item);

    col.appendChild(card);
    row.appendChild(col);

    count++;
  });
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
  infoText.textContent = item.info.substring(0, 400); // Hiển thị chỉ 100 ký tự ban đầu

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
