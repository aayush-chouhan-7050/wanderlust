document.addEventListener('DOMContentLoaded', function() {
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  if (taxSwitch) {
      taxSwitch.addEventListener("click", () => {
          let taxInfo = document.getElementsByClassName("tax_info");
          for (let info of taxInfo) {
              info.style.display = info.style.display !== "inline" ? "inline" : "none";
          }
      });
  }

  let filterKeys = document.getElementsByClassName("filter");
  Array.from(filterKeys).forEach((filterKey) => {
      filterKey.addEventListener("click", () => {
          let selectedKeyword = filterKey.querySelector("p").innerText.trim();
          selectedKeyword = selectedKeyword.replace(/s$/, '');
          console.log("Selected Filter:", selectedKeyword);
          
          let listings = document.getElementsByClassName("card-listing");
          for (let listing of listings) {
              if (selectedKeyword.toLowerCase() === "all") {
                  listing.style.display = "block";
              } else {
                  listing.style.display = "none";
                  let categoryTag = listing.querySelector("i");
                  if (categoryTag && categoryTag.innerText.trim().toLowerCase() === selectedKeyword.toLowerCase()) {
                      listing.style.display = "block";
                      console.log("Visible Listing:", categoryTag.innerText);
                  }
              }
          }
      });
  });

  let searchButton = document.getElementById('searchButton');
  if (searchButton) {
      searchButton.addEventListener('click', searchListings);
  }

  let searchInput = document.getElementById('searchInput');
  if (searchInput) {
      searchInput.addEventListener('input', searchListings);
  }

  function searchListings() {
      let searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
      let listings = document.getElementsByClassName('card-listing');
      Array.from(listings).forEach((listing) => {
          let titleElement = listing.querySelector('b');
          let categoryElement = listing.querySelector('i');
          
          if (titleElement && categoryElement) {
              let title = titleElement.innerText.toLowerCase();
              let category = categoryElement.innerText.toLowerCase();
              listing.style.display = (title.includes(searchQuery) || category.includes(searchQuery)) 
                  ? 'block' 
                  : 'none';
          }
      });
  }
});