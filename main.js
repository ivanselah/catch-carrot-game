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

// Variable

let carrotCount = 10;
let sec = 10;
let Time;
let carrots;

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

function setIntervalTime() {
  Time = setInterval(() => {
    sec--;
    if (carrotCount === 0) {
      modal.style.zIndex = "1";
      modalText.innerText = "⭐ YOU WON 👏";
      modal.style.display = "block";
      audioFunction();
      const audioBg = document.createElement("audio");
      audioBg.setAttribute("src", "sound/game_win.mp3");
      audioBg.setAttribute("autoplay", "");
      document.body.appendChild(audioBg);
    }
    if (sec === 0) {
      console.log("게임종료");
      clearInterval(Time);
      audioFunction();
      modal.style.zIndex = "1";
      modalText.innerText = "YOU LOST 😂";
      modal.style.display = "block";
    }
    timeZone.innerText = `00:${
      sec === 0 ? "00" : sec === 10 ? sec : `0${sec}`
    }`;
  }, 1000);
}

function timeFunction() {
  setTimeout(() => {
    carrotsCount.innerText = 10;
    setIntervalTime();
  }, 500);
}

// Game Start && reStart

const selectCarrots = () => {
  carrots = document.querySelectorAll(".carrot");
  carrots.forEach((carrot) => {
    carrot.addEventListener("click", () => {
      carrot.remove();
      carrotClickSound.play();
      carrotsCount.innerText = --carrotCount;
    });
  });
};

const clickGameStart = () => {
  audioFunction();
  carrotBugRandom();
  selectCarrots();
};

const clickGameReStart = () => {
  const imgTag = document.querySelectorAll("img");
  sec = 11;
  modal.style.display = "none";
  audioFunction();
  imgTag.forEach((img) => img.remove());
  carrotBugRandom();
  selectCarrots();
};

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

function carrotPosition() {
  carrotImage.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("class", "carrot");
    img.setAttribute("width", "150px");
    img.setAttribute("height", "150px");
    img.setAttribute("src", image);
    img.style.position = "absolute";
    img.style.top = `${getRandomNumberTop()}%`;
    img.style.left = `${getRandomNumberleft()}%`;
    document.body.appendChild(img);
  });
}

function bugPosition() {
  bugImage.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("class", "bug");
    img.setAttribute("width", "100px");
    img.setAttribute("height", "100px");
    img.setAttribute("src", image);
    img.style.position = "absolute";
    img.style.top = `${getRandomNumberTop()}%`;
    img.style.left = `${getRandomNumberleft()}%`;
    document.body.appendChild(img);
  });
}

function carrotBugRandom() {
  const imgTagC = document.querySelector("[src='./img/carrot.png']");
  if (imgTagC) {
    return;
  }
  carrotPosition();
  bugPosition();
}

// EventListenr

btnStart.addEventListener("click", clickGameStart);
btnModalReStart.addEventListener("click", clickGameReStart);
