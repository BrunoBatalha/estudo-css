
window.onload = () => init();
function init() {
    const quadrado = document.querySelector('.quadrado');

    let contador = 0;

    document.onmousemove = function (e) {

        quadrado.style.left = (e.pageX - quadrado.offsetHeight / 2) + 'px';
        quadrado.style.top = (e.pageY - quadrado.offsetWidth / 2) + 'px';

        const clone = quadrado.cloneNode(true);
        clone.style.zIndex = 1;

        document.body.appendChild(clone);

    }

}
