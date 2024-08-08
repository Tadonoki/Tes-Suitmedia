let currentPage = 1;
let totalPages = 10;

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  renderPagination();
  handleScroll();
});

function fetchData() {
  pageSize = document.getElementById("perPage").value;
  sortOrder = document.getElementById("sort").value;

  fetch(
    `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderPosts(data.data);
      totalPages = data.meta.total_pages; // Update total pages based on response
      renderPagination();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderPosts(posts) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <img src="${post.small_image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${new Date(post.published_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
        `;
    postsContainer.appendChild(postElement);
  });
}

function renderPagination() {
  const paginationNumbers = document.getElementById("pagination-numbers");
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.innerText = i;
    pageNumber.classList.add("pagination-number");
    if (i === currentPage) {
      pageNumber.classList.add("active");
    }
    pageNumber.addEventListener("click", () => {
      currentPage = i;
      fetchData();
    });
    paginationNumbers.appendChild(pageNumber);
  }
}

function firstPage() {
  if (currentPage > 1) {
    currentPage = 1;
    fetchData();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchData();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    fetchData();
  }
}

function lastPage() {
  if (currentPage < totalPages) {
    currentPage = totalPages;
    fetchData();
  }
}
