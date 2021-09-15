"use strict";

import Modal from "./modal.js";
import { Field, ItemType } from "./field.js";
import Game from "./game.js";

// Global Variable

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");
const timeZone = document.querySelector(".time-zone > span");
const carrotsCount = document.querySelector(".carrots-count");

let sec = 10;
let Timer = undefined;
let carrots = 15;
let bugs = 20;
let isBtnStart = true;
let isBtnStartBool = undefined;
let isBugClick = false;

// ✅ Class

// Modal
const modalShow = new Modal();

modalShow.setClickListener(() => {
  clickGameReStart();
});

// Game

const playGame = new Game(btnStart);

playGame.playReplay(() => {
  rePlay();
});

playGame.playYouLost(() => {
  youLost();
});

playGame.gameStart(() => {
  clickGameStart();
});

// Field

const gameField = new Field(carrots, bugs);

gameField.setClickListener((item) => {
  clickCarrotAndBug(item);
});

const clickCarrotAndBug = (item) => {
  if (item === ItemType.carrot) {
    carrotsCount.innerText = --carrots;
    if (carrots === 0) {
      clearInterval(Timer);
      youWon();
      return;
    }
  } else if (item === ItemType.bug) {
    isBugClick = true;
    youLost();
  }
};

// Timer

function setIntervalTime() {
  Timer = setInterval(() => {
    timeZone.innerText = `00:${sec === 10 ? sec : `0${sec}`}`;
    if (sec === 0) {
      youLost();
      return;
    }
    --sec;
  }, 1000);
}

// You Win
const hiddenClass = () => {
  const Img = document.querySelectorAll("img");
  Img.forEach((img) => (img.style.pointerEvents = "none"));
  btnStart.classList.add("btn-hidden");
  clearInterval(Timer);
};

function youWon() {
  hiddenClass();
  modalShow.output("⭐ YOU WON 👏");
}

// You Lost

function youLost() {
  hiddenClass();
  modalShow.output(" YOU LOST 😂");
}

// Re Start

function rePlay() {
  hiddenClass();
  modalShow.output("🥕 REPLAY ❓");
}

// Game Start && reStart

const clickGameStart = () => {
  if (!btnStartIcon.classList.contains("fa-stop")) {
    setIntervalTime();
    gameField.carrotBugRandom();
    carrotsCount.innerText = carrots;
    isBtnStartBool = playGame.playBtnCheck(isBtnStart);
  } else {
    clearTimeout(Timer);
    isBtnStart = false;
    isBtnStartBool = playGame.playBtnCheck(isBtnStart);
  }
  isBtnStart = isBtnStartBool;
};

const clickGameReStart = () => {
  btnStart.classList.remove("btn-hidden");
  const imgTag = document.querySelectorAll("img");
  if (isBugClick || carrots === 0 || sec === 0) {
    console.log("Hello");
    sec = 10;
    carrots = 15;
    isBtnStart = true;
    isBugClick = false;
    imgTag.forEach((img) => img.remove());
    isBtnStartBool = playGame.playBtnCheck(isBtnStart);
    timeZone.innerText = "00:00";
    carrotsCount.innerText = carrots;
    gameField.carrotBugRandom();
  } else {
    isBtnStart = true;
    isBtnStartBool = playGame.playBtnCheck(isBtnStart);
  }
  setIntervalTime();
  isBtnStart = isBtnStartBool;
};
