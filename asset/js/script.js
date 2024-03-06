const movieUrl = "https://moviesverse1.p.rapidapi.com/get-movie-news";
const celebrityUrl = "https://moviesverse1.p.rapidapi.com/get-celebrities-news";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "94c20f9b9cmsh1ba619fda7b3d93p1953d5jsn33de2389b05a",
    "X-RapidAPI-Host": "moviesverse1.p.rapidapi.com",
  },
};

document.getElementById("fetchMovieButton").addEventListener("click", () => {
  fetchData(movieUrl);
});

document
  .getElementById("fetchCelebrityButton")
  .addEventListener("click", () => {
    fetchData(celebrityUrl);
  });

async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayNews(result.news);
  } catch (error) {
    console.error(error);
  }
}

function displayNews(news) {
  const newsList = document.getElementById("newsList");
  newsList.innerHTML = "";

  news.forEach((item) => {
    const newsItem = document.createElement("li");
    newsItem.classList.add("news-item");

    const image = document.createElement("img");
    image.src = item.image;
    image.classList.add("mb-3");
    newsItem.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = item.title;
    newsItem.appendChild(title);

    const description = document.createElement("p");
    description.textContent = item.description;
    newsItem.appendChild(description);

    const date = document.createElement("p");
    date.textContent = `Date: ${item.date}`;
    newsItem.appendChild(date);

    const writer = document.createElement("p");
    writer.textContent = `Writer: ${item.writer}`;
    newsItem.appendChild(writer);

    const source = document.createElement("p");
    source.textContent = `Source: ${item.source}`;
    newsItem.appendChild(source);

    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = "Read More";
    link.classList.add("btn", "btn-primary", "mt-3");
    link.target = "_blank";
    newsItem.appendChild(link);

    newsList.appendChild(newsItem);
  });
}
