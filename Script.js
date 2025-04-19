function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}
// Guarda o slide atual de cada slider
const slidesAtuais = {};

function mostrarSlide(sliderId, index) {
  const slider = document.getElementById(sliderId);
  const slides = slider.querySelectorAll(".slide");
  const indicadores = slider.querySelector(".indicadores");

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide, i) => {
    slide.classList.remove("ativo");
    if (i === index) slide.classList.add("ativo");
  });

  slidesAtuais[sliderId] = index;

  // Atualiza os indicadores
  if (indicadores) {
    const dots = indicadores.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("ativo", i === index);
    });
  }
}

function mudarSlide(sliderId, direcao) {
  const atual = slidesAtuais[sliderId] || 0;
  mostrarSlide(sliderId, atual + direcao);
}

function criarIndicadores(sliderId) {
  const slider = document.getElementById(sliderId);
  const slides = slider.querySelectorAll(".slide");
  const indicadores = slider.querySelector(".indicadores");

  if (indicadores) {
    indicadores.innerHTML = ""; // limpa antes
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => mostrarSlide(sliderId, i));
      indicadores.appendChild(dot);
    });
  }
}

window.onload = () => {
  document.querySelectorAll(".slider").forEach(slider => {
    const id = slider.id;
    criarIndicadores(id);
    mostrarSlide(id, 0);
  });
};
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

