// Simple flower animation demo
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 10; i++) {
    let flower = document.createElement("div");
    flower.classList.add("flower");
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 5 + Math.random() * 5 + "s";
    hero.appendChild(flower);
  }
});
