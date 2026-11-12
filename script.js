document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-controls").forEach((controls) => {
    const track = document.getElementById(controls.dataset.controls);
    if (!track) return;

    const cards = [...track.querySelectorAll(".ministry-card")];
    const prev = controls.querySelector(".prev");
    const next = controls.querySelector(".next");
    const current = controls.querySelector(".slider-count b");

    function getIndex() {
      if (!cards.length) return 0;
      const left = track.scrollLeft;
      let best = 0;
      let bestDiff = Infinity;
      cards.forEach((card, index) => {
        const diff = Math.abs(card.offsetLeft - track.offsetLeft - left);
        if (diff < bestDiff) { bestDiff = diff; best = index; }
      });
      return best;
    }

    function update() {
      const index = getIndex();
      if (current) current.textContent = String(index + 1);
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === cards.length - 1;
    }

    function go(delta) {
      const index = Math.max(0, Math.min(cards.length - 1, getIndex() + delta));
      cards[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }

    prev?.addEventListener("click", () => go(-1));
    next?.addEventListener("click", () => go(1));
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  const navLinks = [...document.querySelectorAll(".quick-nav a")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, .15, .35] });

  sections.forEach((section) => observer.observe(section));
});
