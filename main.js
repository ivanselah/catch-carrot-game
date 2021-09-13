"use strict";

// Dom Selector

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");
const timeZone = document.querySelector(".time-zone > span");

// Variable

let sec = 10;
let Time;

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
    if (sec === 0) {
      console.log("게임종료");
      clearInterval(Time);
      audioFunction();
    }
    timeZone.innerText = `00:${sec === 0 ? "00" : `0${sec--}`}`;
  }, 1000);
}

function timeFunction() {
  if (sec === 10) {
    sec--;
  }
  setIntervalTime();
}

const clickGameStart = () => {
  audioFunction();
};

// EventListenr

btnStart.addEventListener("click", clickGameStart);
