const state = {
  title: "Meu Task Manager",
  tasks: ["Ler livro", "Jogar LOL"],
};

const main = () => {
  //Pegar a referencia do DOM
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

  // tasks += "<li>Testando 1</li>";
  // tasks += "<li>Testando 2</li>";

  // console.log({ state });
  renderTasks();
};

document.addEventListener("DOMContentLoaded", main);
