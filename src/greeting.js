const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greeting');

const USER_LS = "currentUser", SHOWING_ON = "showing";

function askForName() {
    form.classList.add(SHOWING_ON);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerHTML = `Hello! <sapn class="userName">${text}</span>`;
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(e){
    e.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
        form.addEventListener("submit", handleSubmit);
    }else{
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();