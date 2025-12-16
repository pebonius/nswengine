import Game from "./game.js";
import NSWEngine from "./nswengine.js";

function init() {
  const game = new Game(new NSWEngine());
}

init();
