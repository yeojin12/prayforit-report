document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".lightbox");
  const image = document.querySelector(".lightbox-image");
  const caption = document.querySelector(".lightbox-caption");
  const close = document.querySelector(".lightbox-close");

  document.querySelectorAll(".photo").forEach((item) => {
    item.addEventListener("click", () => {
      image.src = item.dataset.src;
      image.alt = item.dataset.caption || "사역 사진";
      caption.textContent = item.dataset.caption || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeBox(){
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
    document.body.style.overflow = "";
  }
  close.addEventListener("click", closeBox);
  lightbox.addEventListener("click", (e) => { if(e.target === lightbox) closeBox(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeBox(); });
});
