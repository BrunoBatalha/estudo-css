
window.onload = () => init();

function init() {
    const btnMostra = document.querySelector('#btn-mostra-modal');
    const btnVoltar = document.querySelector('.btn-voltar');

    btnMostra.addEventListener('click', mostraModal);
    btnVoltar.addEventListener('click', escondeModal);

    function mostraModal() {
        const modal = document.querySelector('#modal');
        const section = document.querySelector('#modal > section');
        modal.classList.remove('modal-escondido');
        section.classList.add('modal-aparece');
    }

    function escondeModal() {
        const modal = document.querySelector('#modal');
        const section = document.querySelector('#modal > section');
        section.classList.replace('modal-aparece', 'modal-saindo')
        setTimeout(() => {
            modal.classList.add('modal-escondido');
            section.classList.remove('modal-saindo');
        }, 1000);
    }
}
