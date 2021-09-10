"use strict";

const btnStart = document.querySelector(".btn-start");
const btnStartIcon = btnStart.querySelector("i");

const clickGameStart = () => {
  const audioBg = document.createElement("audio");
  audioBg.setAttribute("src", "sound/bg.mp3");
  audioBg.setAttribute("autoplay", "");
  document.body.appendChild(audioBg);

  btnStartIcon.contains("");
};

btnStart.addEventListener("click", clickGameStart);
