const nav = document.querySelector(".navigation");

addEventListener("mousemove", () => {
  nav.style.display = "flex";
});

addEventListener("scroll", () => {
  nav.style.display = "none";
});

addEventListener("dblclick", () => {
  nav.style.display = nav.style.display === "none" ? "flex" : "none";
});
