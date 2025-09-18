function irA(id) {
  try {
    var elemento = document.getElementById(id);
    if (elemento && typeof elemento.scrollIntoView === "function") {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (e) {
    console.error("Error desplazando a sección:", e);
  }
}

// Configurar animación typewriter según longitud del texto
document.addEventListener("DOMContentLoaded", function () {
  var titulo = document.querySelector("h1.typewriter");
  if (!titulo) return;
  var texto = titulo.textContent || "";
  var pasos = Math.max(10, texto.length);
  titulo.style.setProperty("--typing-steps", pasos);
  // Duración proporcional pero limitada
  var dur = Math.min(4.5, 0.08 * pasos + 1.4);
  titulo.style.setProperty("--typing-duration", dur + "s");
  // Iteraciones de parpadeo: unas cuantas después de terminar, luego se queda transparente
  var blinkIterations = Math.max(3, Math.round(dur / 0.8 + 2));
  titulo.style.setProperty("--blink-iterations", blinkIterations);

  // Eliminar completamente el cursor al terminar todas las animaciones
  var totalMs = (dur + blinkIterations * 0.8) * 1000;
  setTimeout(function () {
    titulo.style.borderRight = "0";
  }, totalMs + 50);
});

// Animaciones on-scroll con IntersectionObserver
(function setupReveal() {
  var elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || elementos.length === 0) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elementos.forEach(function (el) {
    io.observe(el);
  });
})();

// Footer year
(function setYear() {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
