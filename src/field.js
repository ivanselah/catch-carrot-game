"use strict";

import * as Sound from "./sound.js";

export const ItemType = Object.freeze({
  carrotClass: ".carrot",
  carrot: "carrot",
  bugClass: ".bug",
  bug: "bug",
});

export class Field {
  constructor(carrots, bugs) {
    this.gameGround = document.querySelector(".game-field");
    this.gameGroundSizeCheck = this.gameGround.getBoundingClientRect();
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = this.gameGroundSizeCheck.width - 150;
    this.y2 = this.gameGroundSizeCheck.height - 150;
    this.carrots = carrots;
    this.bugs = bugs;
    this.gameGround.addEventListener("click", this.onClick);
  }

  setClickListener(clickCarrotAndBug) {
    this.clickCarrotAndBug = clickCarrotAndBug;
  }

  // info.matches(".carrot")
  // 클릭된 타겟이 이 CSS 셀럭터가 맞는지 확인

  onClick = (event) => {
    const carrotOrBug = event.target;
    if (carrotOrBug.matches(ItemType.carrotClass)) {
      Sound.playCarrot();
      carrotOrBug.remove();
      this.clickCarrotAndBug && this.clickCarrotAndBug(ItemType.carrot);
    } else if (carrotOrBug.matches(ItemType.bugClass)) {
      Sound.playBug();
      this.clickCarrotAndBug && this.clickCarrotAndBug(ItemType.bug);
    }
  };

  carrotBugRandom() {
    const CARROTIMAGE = "./img/carrot.png";
    const BUGIMAGE = "./img/bug.png";

    const imgTagC = document.querySelector("[src='./img/carrot.png']");
    if (imgTagC) {
      return;
    }

    const carrotImage = [];
    const bugImage = [];

    for (let i = 0; i < this.carrots; i++) {
      carrotImage.push(CARROTIMAGE);
    }

    for (let i = 0; i < this.bugs; i++) {
      bugImage.push(BUGIMAGE);
    }

    this.imgCreate(carrotImage, "carrot", "150px", "150px");
    this.imgCreate(bugImage, "bug", "100px", "100px");
  }

  setRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  imgCreate(Images, className, sizeWidth, sizeHeight) {
    Images.forEach((image) => {
      const img = document.createElement("img");
      img.setAttribute("class", className);
      img.setAttribute("width", sizeWidth);
      img.setAttribute("height", sizeHeight);
      img.setAttribute("src", image);
      img.style.position = "absolute";
      img.style.top = `${this.setRandomNumber(this.y1, this.y2)}px`;
      img.style.left = `${this.setRandomNumber(this.x1, this.x2)}px`;
      this.gameGround.appendChild(img);
    });
  }
}
