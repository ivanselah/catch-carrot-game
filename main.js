"use strict";

// Dom Selector

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");
const timeZone = document.querySelector(".time-zone > span");
const carrotsCount = document.querySelector(".carrots-count");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text > span");
const btnModalReStart = document.querySelector(".btn-reStart");

// Global Variable

let sec = 10;

let Timer = undefined;
let carrots = 15;
let bugs = 20;

let isBugClick = false;
let isYouWon = false;

// Click Sound Set

const carrotClickSound = new Audio("./sound/carrot_pull.mp3");
const bugClickSound = new Audio("./sound/bug_pull.mp3");

// Carrots && bugs Set

const CARROTIMAGE = "./img/carrot.png";
const BUGIMAGE = "./img/bug.png";

const carrotImage = [];
const bugImage = [];

for (let i = 0; i < carrots; i++) {
  carrotImage.push(CARROTIMAGE);
}

for (let i = 0; i < bugs; i++) {
  bugImage.push(BUGIMAGE);
}

// Audio & Timer

function playBtnCheckBgSound() {
  const audioTagC = document.querySelector("[src='sound/bg.mp3']");
  const Img = document.querySelectorAll("img");
  if (audioTagC) {
    Img.forEach((img) => (img.style.pointerEvents = "none"));
    btnStartIcon.classList.remove("fa-stop");
    audioTagC.remove();
    if (!isYouWon) {
      reStart();
    }
    clearInterval(Timer);
    return;
  } else {
    timeFunction();
    Img.forEach((img) => (img.style.pointerEvents = "auto"));
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

function modalOutput(text) {
  modal.style.zIndex = "1";
  modalText.innerText = text;
  modal.style.display = "block";
  btnStart.style.visibility = "hidden";
}

// You Win

function youWon() {
  playBtnCheckBgSound();
  audioCreate("src", "sound/game_win.mp3");
  modalOutput("⭐ YOU WON 👏");
  isYouWon = false;
}

// You Lost

function youLost() {
  playBtnCheckBgSound();
  audioCreate("src", "sound/alert.wav");
  modalOutput(" YOU LOST 😂");
}

// Re Start

function reStart() {
  modalOutput("🥕 REPLAY ❓");
}

function setIntervalTime() {
  Timer = setInterval(() => {
    timeZone.innerText = `00:${sec === 10 ? sec : `0${sec}`}`;
    if (sec === 0) {
      clearInterval(Timer);
      youLost();
      return;
    }
    --sec;
  }, 1000);
}

function timeFunction() {
  carrotsCount.innerText = carrots;
  setIntervalTime();
}

// Game Start && reStart

const selectCarrots = (info) => {
  info.remove();
  carrotClickSound.play();
  carrotsCount.innerText = --carrots;
  if (carrots === 0) {
    clearInterval(Timer);
    isYouWon = true;
    youWon();
    return;
  }
};

// info.matches(".carrot")
// 클릭된 타겟이 이 CSS 셀럭터가 맞는지 확인

const selectBugs = (info) => {
  if (info) {
    bugClickSound.play();
    isBugClick = true;
    youLost();
  }
};

const clickGameStart = () => {
  playBtnCheckBgSound();
  carrotBugRandom();
};

const clickGameReStart = () => {
  btnStart.style.visibility = "visible";
  const imgTag = document.querySelectorAll("img");
  if (isBugClick || carrots === 0 || sec === 0) {
    sec = 10;
    carrots = 15;
    isBugClick = false;
    imgTag.forEach((img) => img.remove());
    playBtnCheckBgSound();
    timeZone.innerText = "00:10";
    setTimeout(() => {
      carrotBugRandom();
    }, 1000);
  } else if (carrots !== 0 && sec !== 0) {
    playBtnCheckBgSound();
  }
  modal.style.display = "none";
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
