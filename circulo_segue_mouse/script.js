window.onload = () => init();
function init() {
  const quadrado = document.querySelector("#quadrado-main");

  document.onmousemove = function (e) {
    quadrado.style.left = e.pageX - quadrado.offsetHeight / 2 + "px";
    quadrado.style.top = e.pageY - quadrado.offsetWidth / 2 + "px";

    const clone = quadrado.cloneNode(true);
    clone.style.zIndex = 1;
    clone.id = "";

    document.body.appendChild(clone);
  };
  function run() {
    const quadrados = document.querySelectorAll(".quadrado");
    if (quadrados.length > 5) {
      for (let i = 1; i < quadrados.length - 50; i++) {
        quadrados.item(i).remove();
      }
    }

    window.requestAnimationFrame(run);
  }
  run();
}
