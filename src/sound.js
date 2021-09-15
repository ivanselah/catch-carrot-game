"use strict";

const bgSound = new Audio("./sound/bg.mp3");
const wonSound = new Audio("sound/game_win.mp3");
const lostSound = new Audio("sound/alert.wav");
const carrotClickSound = new Audio("./sound/carrot_pull.mp3");
const bugClickSound = new Audio("./sound/bug_pull.mp3");

export function playBackgorund() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function playWon() {
  playSound(wonSound);
}

export function playLost() {
  playSound(lostSound);
}

export function playCarrot() {
  playSound(carrotClickSound);
}

export function playBug() {
  playSound(bugClickSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
