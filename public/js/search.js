let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax_info");
  for (let info of taxInfo) {
    info.style.display = info.style.display !== "inline" ? "inline" : "none";
  }
});

let filterKeys = document.getElementsByClassName("filter");

Array.from(filterKeys).forEach((filterKey) => {
filterKey.addEventListener("click", () => {
  let selectedKeyword = filterKey.querySelector("p").innerText.trim();
  // Remove trailing 's' if it exists
  selectedKeyword = selectedKeyword.replace(/s$/, '');
  console.log("Selected Filter:", selectedKeyword); // Log the selected filter
  
  let listings = document.getElementsByClassName("card-listing");
  
  for (let listing of listings) { // Loop through each listing
    if (selectedKeyword.toLowerCase() === "all") {
      listing.style.display = "block"; // Show all listings if "All" is selected
    } else {
      listing.style.display = "none"; // Hide all listings initially
      let categoryTag = listing.querySelector("i"); // Select the first <i> tag within the listing
      
      // Check if the <i> tag exists and its inner text matches the selected filter value
      if (categoryTag && categoryTag.innerText.trim().toLowerCase() === selectedKeyword.toLowerCase()) {
        listing.style.display = "block"; // Show the listing if it matches the selected filter
        console.log("Visible Listing:", categoryTag.innerText); // Log the visible listing's <i> text
      }
    }
  }
});
});
document.getElementById('searchButton').addEventListener('click', () => {
let searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
let listings = document.getElementsByClassName('card-listing');

Array.from(listings).forEach((listing) => {
  let title = listing.querySelector('b').innerText.toLowerCase();
  let category = listing.querySelector('i').innerText.toLowerCase();
  
  if (title.includes(searchQuery) || category.includes(searchQuery)) {
    listing.style.display = 'block';
  } else {
    listing.style.display = 'none';
  }
});
});

// Also handle search on input change
document.getElementById('searchInput').addEventListener('input', () => {
let searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
let listings = document.getElementsByClassName('card-listing');

Array.from(listings).forEach((listing) => {
  let title = listing.querySelector('b').innerText.toLowerCase();
  let category = listing.querySelector('i').innerText.toLowerCase();
  
  if (title.includes(searchQuery) || category.includes(searchQuery)) {
    listing.style.display = 'block';
  } else {
    listing.style.display = 'none';
  }
});
});