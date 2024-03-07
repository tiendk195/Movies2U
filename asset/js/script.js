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

async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayNews(result.news);
  } catch (error) {
    console.error(error);
  }
}

// Đoạn code cho phần displayNews

function displayNews(news) {
  const newsList = document.getElementById("newsList");
  newsList.innerHTML = "";

  // Tạo div mới cho mỗi cặp tin tức
  for (let i = 0; i < news.length; i += 2) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Tạo div con cho mỗi tin tức
    for (let j = i; j < Math.min(i + 2, news.length); j++) {
      const item = news[j];
      const col = document.createElement("div");
      col.classList.add("col-md-6", "mb-3");

      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      const image = document.createElement("img");
      image.src = item.image;
      image.classList.add("mb-3");
      newsItem.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = item.title;
      newsItem.appendChild(title);

      // Mô tả với chức năng Show more/less
      const description = document.createElement("p");
      description.textContent = item.description.substring(0, 100); // Chỉ hiển thị 100 ký tự ban đầu
      description.classList.add("description");

      const showMoreButton = document.createElement("button");
      showMoreButton.textContent = "Show more";
      showMoreButton.classList.add("btn", "btn-link", "show-more");
      showMoreButton.addEventListener("click", () => {
        if (showMoreButton.textContent === "Show more") {
          description.textContent = item.description;
          showMoreButton.textContent = "Show less";
        } else {
          description.textContent = item.description.substring(0, 100);
          showMoreButton.textContent = "Show more";
        }
      });

      newsItem.appendChild(description);
      newsItem.appendChild(showMoreButton);

      const date = document.createElement("p");
      date.innerHTML = `<strong>Date:</strong> ${item.date}`;
      newsItem.appendChild(date);

      const writer = document.createElement("p");
      writer.innerHTML = `<strong>Writer:</strong> ${item.writer}`;
      newsItem.appendChild(writer);

      const source = document.createElement("p");
      source.innerHTML = `<strong>Source:</strong> ${item.source}`;
      newsItem.appendChild(source);

      const link = document.createElement("a");
      link.href = item.link;
      link.textContent = "Read More";
      link.classList.add("btn", "btn-primary", "mt-3");
      link.target = "_blank";
      newsItem.appendChild(link);

      col.appendChild(newsItem);
      row.appendChild(col);
    }

    newsList.appendChild(row);
  }
}
