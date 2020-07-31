const $ = document.querySelector.bind(document);

window.onload = () => {
  initPage();
};

function initPage() {
  managementSideMenu();
}

function managementSideMenu() {
  const html = {
    menu: $("#menu-wrapper"),
    titleMenu: $(".toggle-menu").previousElementSibling,
    btnMenu: $(".toggle-menu"),
    itemsMenu: [...$(".menu-list").children]
  };
  let isMenuOpen = false;

  html.btnMenu.addEventListener("click", toggleMenu);

  function toggleMenu() {
    html.menu.classList.toggle("open");
    html.titleMenu.classList.toggle("d-none");
    html.btnMenu.classList.toggle("translate-horizontal-right");

    html.itemsMenu.forEach(liTag => {
      const childrens = [...liTag.children];

      childrens.forEach(aTag => {
        aTag.children[1].classList.toggle("d-none");
        if (isMenuOpen) {
            aTag.classList.replace("left-text", "center-text");
        } else {
            aTag.classList.replace("center-text", "left-text");
        }
      });
    });
    isMenuOpen = !isMenuOpen;
  }
}
