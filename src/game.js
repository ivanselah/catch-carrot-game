"use strict";

import * as Sound from "./sound.js";

class Game {
  constructor(btnStart) {
    this.btnStartIcon = btnStart.querySelector("i");
    this.btnStart = btnStart;
    this.btnStart.addEventListener("click", () => {
      this.clickGameStart && this.clickGameStart();
    });
  }

  gameStart(clickGameStart) {
    this.clickGameStart = clickGameStart;
  }

  playReplay(rePlay) {
    this.rePlay = rePlay;
  }

  playYouLost(youLost) {
    this.youLost = youLost;
  }

  playBtnCheck(isBtnStart) {
    const Img = document.querySelectorAll("img");
    if (isBtnStart) {
      Sound.playBackgorund();
      Img.forEach((img) => (img.style.pointerEvents = "auto"));
      this.btnStartIcon.classList.add("fa-stop");
      isBtnStart = false;
      return isBtnStart;
    } else {
      this.rePlay && this.rePlay();

      this.btnStartIcon.classList.remove("fa-stop");
    }
  }
}

export default Game;
