"use strict";

import * as Sound from "./sound.js";

class Modal {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.modalText = document.querySelector(".modal-text > span");
    this.btnModalReStart = document.querySelector(".btn-reStart");
    this.btnModalReStart.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  setModalInfo(text) {
    Sound.stopBackground();
    this.modal.style.zIndex = "1";
    this.modalText.innerText = text;
    this.modal.style.display = "block";
  }

  output(text) {
    if (text.includes("WON")) {
      Sound.playWon();
    } else if (text.includes("LOST")) {
      Sound.playLost();
    }
    this.setModalInfo(text);
  }
  hide() {
    this.modal.style.display = "none";
  }
}

export default Modal;
