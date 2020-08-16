import "./styles.css";

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishList = document.querySelector(".js-finishList");

const TODOS_LS = "toDos";
const FINISH_LS = "finish";

let toDos = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ulName = btn.parentNode.parentNode.className;
  if (ulName === "js-toDoList") {
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  } else {
    finishList.removeChild(li);
    const cleanFinished = finished.filter(function (finish) {
      return finish.id !== parseInt(li.id);
    });
    finished = cleanFinished;
    saveFinished();
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFinished() {
  localStorage.setItem(FINISH_LS, JSON.stringify(finished));
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISH_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      paintFinished(finished.text);
    });
  }
}

function changeState(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ulName = btn.parentNode.parentNode.className;
  if (ulName === "js-toDoList") {
    const changeItemText = toDos.filter(function (toDo) {
      return toDo.id == parseInt(li.id);
    });
    const finishText = changeItemText[0].text;
    paintFinished(finishText);
    deleteToDo(event);
  } else {
    const changeItemText = finished.filter(function (finish) {
      return finish.id == parseInt(li.id);
    });
    const toDoText = changeItemText[0].text;
    paintToDo(toDoText);
    deleteToDo(event);
  }
}

function paintFinished(text) {
  const li = document.createElement("li");

  //
  const delBtn = document.createElement("button");
  delBtn.className = "btn del";
  // delBtn.innerHTML = "&#10006;";
  delBtn.addEventListener("click", deleteToDo);

  const returnBtn = document.createElement("button");
  returnBtn.className = "btn re";
  // returnBtn.innerHTML = "&#11014;";
  returnBtn.addEventListener("click", changeState);

  const span = document.createElement("span");
  span.className = "content";
  const newId = finished.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(returnBtn);
  li.id = newId;
  finishList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  finished.push(toDoObj);
  saveFinished();
}

function paintToDo(text) {
  const li = document.createElement("li");

  //
  const delBtn = document.createElement("button");
  delBtn.className = "btn del";
  // delBtn.innerHTML = "&#10006;";
  delBtn.addEventListener("click", deleteToDo);

  const doneBtn = document.createElement("button");
  doneBtn.className = "btn done";
  // doneBtn.innerHTML = "&#10004;";
  doneBtn.addEventListener("click", changeState);

  const span = document.createElement("span");
  span.className = "content";
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
