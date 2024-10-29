const state = {
  title: "Minha primeira pagina estática",
  tasks: [
    "Estudar",
    "Caminhar",
    "Trabalhar",
    "Ler",
    "Praticar exercícios",
    "Desenvolver projeto",
    "Revisar código",
  ],
};

const main = () => {
  const $title = document.querySelector("#js-title");
  const $list = document.querySelector("#js-list");
  $title.textContent = state.title;

  const renderTasks = () => {
    let tasks = "";

    state.tasks.forEach((task) => {
      console.log({ task });
      tasks += `<li>${task}</li>`;
    });

    $list.innerHTML = tasks;
  };
  renderTasks();
};
document.addEventListener("DOMContentLoaded", main);
