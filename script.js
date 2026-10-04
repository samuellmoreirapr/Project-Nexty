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



document.addEventListener('DOMContentLoaded', () => {
  // 1. Garante que o ID corresponde ao elemento do menu
  const menuElement = document.getElementById('meuMenu');
  if (!menuElement) return;

  const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(menuElement);
  let bloqueioVoltar = false;

  // 2. Quando o menu abre completamente:
  menuElement.addEventListener('shown.bs.offcanvas', () => {
    // Insere o estado fantasma no histórico
    history.pushState({ offcanvasAberto: true }, '');
    bloqueioVoltar = true;
  });

  // 3. Captura o botão físico/gesto de retroceder do telemóvel:
  window.addEventListener('popstate', (e) => {
    if (bloqueioVoltar) {
      bloqueioVoltar = false;
      bsOffcanvas.hide(); // Fecha a gaveta
    }
  });

  // 4. Se fechar pelo 'X' ou tocando fora, consome o histórico fantasma:
  menuElement.addEventListener('hidden.bs.offcanvas', () => {
    if (bloqueioVoltar) {
      bloqueioVoltar = false;
      history.back(); // Remove o estado extra
    }
  });
});