function toggleMenu() {
  const menu = document.querySelector(".menus");
  const ul = document.querySelector(".menus > ul");
  menu.classList.toggle("open");
  ul.classList.toggle("d-block");
}
