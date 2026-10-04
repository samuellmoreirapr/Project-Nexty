document.querySelectorAll(".categoria").forEach(categoria => {
    const [r, g, b] = getComputedStyle(categoria)
        .backgroundColor.match(/\d+/g)
        .map(Number);

    const isDark = (r * 299 + g * 587 + b * 114) < 128000;

    categoria.style.color = isDark ? "#fff" : "#000";
});

const checkbox = document.querySelector("#minhaCheckbox");

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        checkbox.disabled = true;
    }
});


const offcanvasElement = document.getElementById('meuMenu'); // Substitua pelo ID exato da sua div offcanvas
const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

let menuAbertoPeloHistorico = false;

// 1. Quando o menu abre: empurra um estado fantasma no histórico
offcanvasElement.addEventListener('show.bs.offcanvas', () => {
  history.pushState({ menuAberto: true }, '');
  menuAbertoPeloHistorico = true;
});

// 2. Quando o usuário clica no botão "Voltar" do celular
window.addEventListener('popstate', (event) => {
  if (menuAbertoPeloHistorico) {
    menuAbertoPeloHistorico = false;
    bsOffcanvas.hide(); // Fecha a barra lateral
  }
});

// 3. Se o usuário fechar pelo 'X' ou tocando fora, desfaz o histórico extra
offcanvasElement.addEventListener('hide.bs.offcanvas', () => {
  if (menuAbertoPeloHistorico) {
    menuAbertoPeloHistorico = false;
    history.back(); // Volta o histórico para não acumular páginas fantasmas
  }
});