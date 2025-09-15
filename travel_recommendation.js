// Fetch data from JSON
let travelData = {};

fetch("./travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("API Loaded:", travelData);
  })
  .catch(error => console.error("Error loading API:", error));

// Search button logic
document.getElementById("btnSearch").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!keyword) {
    resultsContainer.innerHTML = "<p>Please enter a keyword.</p>";
    return;
  }

  let results = [];

  if (keyword.includes("beach")) {
    results = travelData.beaches;
  } else if (keyword.includes("temple")) {
    results = travelData.temples;
  } else {
    // check countries
    results = travelData.countries.filter(country =>
      country.name.toLowerCase().includes(keyword)
    ).flatMap(c => c.cities);
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p style=\"text-align: center; color: white; font-size: 40px;\">No results found.</p>";
  } else {
    results.forEach(place => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${place.imageUrl}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      `;
      resultsContainer.appendChild(card);
    });
  }

  resultsContainer.scrollIntoView({
    behavior: "smooth",  // Smooth scroll effect
    block: "start"       // Align to the top of the page
  });
});

// Reset button logic
document.getElementById("btnReset").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
});

// Optional Task 10: Country Time Example
function showTimeForCountry(timeZone, containerId) {
  const options = {
    timeZone: timeZone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const currentTime = new Date().toLocaleTimeString('en-US', options);
  document.getElementById(containerId).innerText = "Local time: " + currentTime;
}
