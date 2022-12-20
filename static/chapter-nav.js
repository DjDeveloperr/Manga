const nav = document.querySelector(".navigation");

addEventListener("mousemove", () => {
  nav.style.display = "flex";
});

addEventListener("scroll", () => {
  nav.style.display = "none";
});

addEventListener("dblclick", (e) => {
  if (!e.target?.classList?.contains("page") || e.tagName !== "IMG") return;
  nav.style.display = nav.style.display === "none" ? "flex" : "none";
});
