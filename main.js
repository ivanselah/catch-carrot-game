"use strict";

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");

const clickGameStart = (event) => {
  console.log(event);
  const audioBg = document.createElement("audio");
  const audioTagC = audioBg.querySelector("[src='sound/bg.mp3']");
  if (audioTagC) {
    return;
  }
  audioBg.setAttribute("src", "sound/bg.mp3");
  audioBg.setAttribute("autoplay", "");
  document.body.appendChild(audioBg);

  btnStartIcon.classList.toggle("fa-stop");
};

btnStart.addEventListener("click", clickGameStart);
