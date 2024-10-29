const getCurrentDate = () =>
  new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

class App {
  constructor() {
    this.$todo = document.querySelector("#todo");
    this.$doing = document.querySelector("#doing");
    this.$completed = document.querySelector("#completed");

    this.$form = document.querySelector("#form");

    this.tags = ["frontend", "backend", "ux"];

    this.cards = [
      {
        id: 1,
        section: "todo",
        tag: "frontend",
        description: "Ler livro",
        createdAt: getCurrentDate(),
      },
    ];

    this.eventListeners();
  }

  initialize() {
    this.render();
  }

  eventListeners() {
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.$form);
      // how to type
      const data = Object.fromEntries(formData);
      const { tag, description } = data;
      if (!tag || !description) {
        return;
      }
      const card = {
        id: Date.now(),
        section: "todo",
        description,
        tag,
        createdAt: getCurrentDate(),
      };
      this.cards.push(card);
      this.render();
    });

    this.$todo.addEventListener("click", (event) => {
      this.onMoveCard(event);
    });
    this.$doing.addEventListener("click", (event) => {
      this.onMoveCard(event);
    });
    this.$completed.addEventListener("click", (event) => {
      this.onMoveCard(event);
    });
  }

  onMoveCard(event) {
    const target = event.target;
    const button = target.closest("button");
    if (!button) {
      return;
    }

    const id = Number(button.dataset.id);
    const move = button.dataset.move;
    const card = this.cards.find((c) => c.id === id);

    switch (card?.section) {
      case "todo":
        if (move === "left") {
          console.log("não pode voltar");
          return;
        }
        card.section = "doing";
        break;
      case "doing":
        if (move === "left") {
          card.section = "todo";
        } else {
          card.section = "completed";
        }
        break;
      case "completed":
        if (move === "right") {
          console.log("não pode avançar");
          return;
        }
        card.section = "doing";
        break;
    }
    this.render();
  }

  render() {
    // todos
    const todos = this.cards.filter((card) => card.section === "todo");
    this.renderTotal(this.$todo.querySelector("small"), todos.length);
    this.renderCards(this.$todo.querySelector("ul"), todos);

    // doing
    const doings = this.cards.filter((card) => card.section === "doing");
    this.renderTotal(this.$doing.querySelector("small"), doings.length);
    this.renderCards(this.$doing.querySelector("ul"), doings);

    // completed
    const completeds = this.cards.filter(
      (card) => card.section === "completed"
    );
    this.renderTotal(this.$completed.querySelector("small"), completeds.length);
    this.renderCards(this.$completed.querySelector("ul"), completeds);
  }

  renderTotal(dom, total) {
    dom.textContent = `total ${total}`;
  }

  renderCards(dom, cards) {
    const html = cards
      .map(
        (card) => `
        <li>
          <span>${card.tag}</span>
          <p>${card.description}</p>
          <div>
            <button class="move" data-move="left" data-id="${card.id}">👈</button>
            <button class="move" data-move="right" data-id="${card.id}">👉</button>
          </div>
          <span>${card.createdAt}</span>
        </li>
        `
      )
      .join("");

    dom.innerHTML = html;
    console.log({ dom, html });
  }
}

const app = new App();

app.initialize();
