const App = {
  // All of our selected HTML elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    const { menu, menuItems, resetBtn, newRoundBtn, squares } = App.$;
    console.log(squares);
    menu.addEventListener("click", () => {
      menuItems.classList.toggle("hidden");
    });
    resetBtn.addEventListener("click", () => {
      console.log("1");
    });
    newRoundBtn.addEventListener("click", () => {
      console.log("1");
    });
    squares.forEach((square) =>
      square.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
      })
    );
  },
};

window.addEventListener("load", App.init);
