window.onload = () => init();
function toggleMenu() {
    const menus = document.querySelector('.menus');
    menus.style.display =
        menus.style.display === 'block' ? 'none' : 'block'
}
function init() {

    window.onresize = function (e) {
        const menus = document.querySelector('.menus');
        if (e.target.innerWidth > 600) {
            menus.style.display = 'block';
        } else {
            menus.style.display = 'none';
        }
    }
}