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


/* Scroll-driven opening: split the name apart to reveal the existing portfolio. */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const curtain = document.querySelector(".intro-curtain");
  const panel = document.querySelector(".intro-curtain__panel");
  const topHalf = document.querySelector(".intro-curtain__half--top");
  const bottomHalf = document.querySelector(".intro-curtain__half--bottom");
  const hint = document.querySelector(".intro-curtain__hint");
  const hero = document.querySelector(".hero");

  if (curtain && panel && topHalf && bottomHalf && hero) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      curtain.remove();
    } else {
      gsap.set(panel, {
        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%)"
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
        .to(topHalf, { yPercent: -32, ease: "none" }, 0)
        .to(bottomHalf, { yPercent: 32, ease: "none" }, 0)
        .to(panel, {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%, 0 100%, 100% 100%, 100% 100%, 0 100%)",
          ease: "power2.inOut"
        }, 0)
        .to(hint, { autoAlpha: 0, y: 12, ease: "none" }, 0);

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=100%",
        onLeave: () => gsap.set(curtain, { autoAlpha: 0 }),
        onEnterBack: () => gsap.set(curtain, { autoAlpha: 1 })
      });
    }
  }
}
