"use strict";

// Dom Selector

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");
const timeZone = document.querySelector(".time-zone > span");
const carrotsCount = document.querySelector(".carrots-count");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text > span");
const btnModalReStart = document.querySelector(".btn-reStart");

const carrotClickSound = document.querySelector(".carrotClick");
const bugClickSound = document.querySelector(".bugClick");

// Global Variable

let carrotCount = 10;
let sec = 10;
let Time;
let carrots;
let isBugClick = false;

// Carrots && bugs Variable

const CARROTIMAGE = "./img/carrot.png";
const BUGIMAGE = "./img/bug.png";

const carrotImage = [
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
  CARROTIMAGE,
];

const bugImage = [
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
  BUGIMAGE,
];

// Audio & Time

function audioFunction() {
  const audioTagC = document.querySelector("[src='sound/bg.mp3']");
  if (audioTagC) {
    btnStartIcon.classList.remove("fa-stop");
    audioTagC.remove();
    clearInterval(Time);
    return;
  } else {
    timeFunction();
    btnStartIcon.classList.add("fa-stop");
    const audioBg = document.createElement("audio");
    audioBg.setAttribute("src", "sound/bg.mp3");
    audioBg.setAttribute("autoplay", "");
    document.body.appendChild(audioBg);
  }
}

// Create Element

function audioCreate(src, sound) {
  const audioBg = document.createElement("audio");
  audioBg.setAttribute(src, sound);
  audioBg.setAttribute("autoplay", "");
  document.body.appendChild(audioBg);
}

function imgCreate(Images, className, onclickFunction, sizeWidth, sizeHeight) {
  Images.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("class", className);
    img.setAttribute("onclick", onclickFunction);
    img.setAttribute("width", sizeWidth);
    img.setAttribute("height", sizeHeight);
    img.setAttribute("src", image);
    img.style.position = "absolute";
    img.style.top = `${getRandomNumberTop()}%`;
    img.style.left = `${getRandomNumberleft()}%`;
    document.body.appendChild(img);
  });
}

// You Win

function youWon() {
  modal.style.zIndex = "1";
  modalText.innerText = "⭐ YOU WON 👏";
  modal.style.display = "block";
  audioFunction();
  audioCreate("src", "sound/game_win.mp3");
  return;
}

// You Lost

function youLost() {
  clearInterval(Time);
  audioFunction();
  audioCreate("src", "sound/alert.wav");
  modal.style.zIndex = "1";
  modalText.innerText = "YOU LOST 😂";
  modal.style.display = "block";
  return;
}

function setIntervalTime() {
  Time = setInterval(() => {
    --sec;
    timeZone.innerText = `00:${
      sec === 0 ? "00" : sec === 10 ? sec : `0${sec}`
    }`;
    if (carrotCount === 0) {
      youWon();
    }
    if (sec === 0) {
      youLost();
    }
  }, 1000);
}

function timeFunction() {
  carrotsCount.innerText = carrotCount;
  setIntervalTime();
}

// Game Start && reStart

const selectCarrots = (info) => {
  info.remove();
  carrotClickSound.play();
  carrotsCount.innerText = --carrotCount;
};

const selectBugs = (info) => {
  if (info) {
    bugClickSound.play();
    isBugClick = true;
    youLost();
  }
};

const clickGameStart = () => {
  audioFunction();
  carrotBugRandom();
};

const clickGameReStart = () => {
  const imgTag = document.querySelectorAll("img");
  sec = 11;
  carrotCount = 10;
  isBugClick = false;
  modal.style.display = "none";
  imgTag.forEach((img) => img.remove());
  audioFunction();
  timeZone.innerText = "00:10";
  setTimeout(() => {
    carrotBugRandom();
  }, 1000);
};

// Random Number

function getRandomNumberTop() {
  while (true) {
    const getNumber = Math.floor(Math.random() * 150);
    if (50 >= getNumber || getNumber >= 85) {
      continue;
    } else {
      return getNumber;
    }
  }
}

function getRandomNumberleft() {
  while (true) {
    const getNumber = Math.floor(Math.random() * 150);
    if (getNumber > 95) {
      continue;
    } else {
      return getNumber;
    }
  }
}

// Add Img Tags
// Images, className, onclickFunction, sizeWidth, sizeHeight

function carrotBugRandom() {
  const imgTagC = document.querySelector("[src='./img/carrot.png']");
  if (imgTagC) {
    return;
  }
  imgCreate(carrotImage, "carrot", "selectCarrots(this)", "150px", "150px");
  imgCreate(bugImage, "bug", "selectBugs(this)", "100px", "100px");
}

// EventListenr

btnStart.addEventListener("click", clickGameStart);
btnModalReStart.addEventListener("click", clickGameReStart);
