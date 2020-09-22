const button = document.querySelector(".button");

button.addEventListener("click", toggleButton);

function toggleButton() {
  button.classList.toggle("active");
}
