const body = document.querySelector('body');

const IMG_NUMBER = 3;

function handleImgLoad(){
    console.log('Image loaded');
}

function painImage(imgNumber) {
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
    // body.appendChild(image);
    // image.addEventListener('loaded', handleImgLoad);

}

function genRadom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRadom();
    painImage(randomNumber);
}

init();