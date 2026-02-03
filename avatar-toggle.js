// avatar-toggle.js
const image = document.getElementById("avatar");

image.addEventListener("click", function () {
  if (image.src.match("./assests/santa.png")) {
    image.src = "./assests/reindeer.png";
  } else if (image.src.match("./assests/reindeer.png")) {
    image.src = "./assests/bear.png";
  } else if (image.src.match("./assests/bear.png")) {
    image.src = "./assests/cookie.png";
  } else {
    image.src = "./assests/santa.png";
  }
});