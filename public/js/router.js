export class Router {
  routes = {};
  backgrounds = {
    "/": "../assets/background-home.png",
    "/universe": "../assets/background-universe.png",
    "/exploration": "../assets/background-exploration.png",
    404: "../assets/background-home.png",
  };

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    const appElement = document.querySelector("#app");
    const bodyElement = document.body;

    const linksAndButtons = document.querySelectorAll("a, button");
    linksAndButtons.forEach((element) => (element.disabled = true));

    appElement.classList.add("transition");

    appElement.style.opacity = "0";

    setTimeout(() => {
      fetch(route)
        .then((data) => data.text())
        .then((html) => {
          appElement.innerHTML = html;

          const background =
            this.backgrounds[pathname] || this.backgrounds["404"];
          bodyElement.style.background = `url(${background}) lightgray 50% / cover no-repeat`;

          appElement.style.opacity = "1";

          setTimeout(() => {
            appElement.classList.remove("transition");
            
            linksAndButtons.forEach(element => element.disabled = false);
          }, 1000);
        });
    }, 1000);
  }
}
