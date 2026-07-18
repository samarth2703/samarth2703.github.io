const root = document.documentElement;
const progress = document.querySelector(".scroll-progress span");

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollableHeight > 0 ? window.scrollY / scrollableHeight * 100 : 0;
  progress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

document.addEventListener("pointermove", event => {
  root.style.setProperty("--mouse-x", `${event.clientX}px`);
  root.style.setProperty("--mouse-y", `${event.clientY}px`);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const animationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, { threshold: .35 });

document.querySelectorAll(".footer-reveal").forEach(element => animationObserver.observe(element));
