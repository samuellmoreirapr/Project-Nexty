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