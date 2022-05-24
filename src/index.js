// write your code here

const ramenURL = "http://localhost:3000/ramens";
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetails = document.querySelector("#ramen-detail");
const newRamenForm = document.querySelector("#new-ramen");

fetch(ramenURL)
  .then((response) => response.json())
  .then((ramens) =>
    ramens.forEach((ramen) => {
      renderRamenrsToPage(ramen);
    })
  );

function renderRamenrsToPage(ramen) {
  const ramenImg = document.createElement("img");
  const ramenName = ramen.name;
  const ramenResturant = ramen.restaurant;
  const ramenRating = ramen.rating;
  const ramenComment = ramen.comment;
  const ramenId = ramen.id;
  ramenImg.src = ramen.image;
  ramenImg.alt = ramenName;
  ramenImg.id = ramenId;

    if(ramenId === 1){
        setRamenDetailsSectionToCurrentRamen(
            ramenImg,
            ramenName,
            ramenResturant,
            ramenComment,
            ramenRating,
            ramen
          )
    }


  showRamenDetails(
    ramenImg,
    ramenName,
    ramenResturant,
    ramenComment,
    ramenRating,
    ramen
  );

  ramenMenu.append(ramenImg);
}

newRamenForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRamenFormData = new FormData(e.target);

  const name = newRamenFormData.get("name");
  const restaurant = newRamenFormData.get("restaurant");
  const image = newRamenFormData.get("image");
  const rating = newRamenFormData.get("rating");
  const comment = newRamenFormData.get("new-comment");

  const newRamenObject = {
    name,
    restaurant,
    image,
    rating,
    comment,
  };

  fetch(ramenURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newRamenObject),
  })
    .then((response) => response.json())
    .then((updatedRamens) => {
      renderRamenrsToPage(updatedRamens);
    });
});

function showRamenDetails(
  ramenImg,
  ramenName,
  ramenResturant,
  ramenComment,
  ramenRating,
  ramen
) {
  ramenImg.addEventListener("click", () => {
    setRamenDetailsSectionToCurrentRamen(
      ramenImg,
      ramenName,
      ramenResturant,
      ramenComment,
      ramenRating,
      ramen
    );
  });
}

function setRamenDetailsSectionToCurrentRamen(
  ramenImg,
  ramenName,
  ramenResturant,
  ramenComment,
  ramenRating,
  ramen
) {
  const h2 = document.querySelector("#ramen-name");
  const h3 = document.querySelector("#resturant-name");
  const pComment = document.querySelector("#comment-display");
  const spanRatin = document.querySelector("#rating-display");
  const detailsIMg = document.querySelector("#detailsImage");

  h2.textContent = ramenName;
  h3.textContent = ramenResturant;
  pComment.textContent = ramenComment;
  spanRatin.textContent = ramenRating;
  detailsIMg.src = ramen.image;
}


