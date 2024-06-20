export function highlightCurrentPage() {
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.style.transition = "color 1s ease";

    if (link.getAttribute("href") === currentUrl) {
      link.style.color = "white";
      link.style.fontWeight = "700";
      link.style.fontSize = "2.4rem";
    } else {
      link.style.color = "#C4C4CC";
      link.style.fontWeight = "400";
      link.style.fontSize = "2.2rem";
    }

    link.addEventListener('click', highlightCurrentPage);
  });
}