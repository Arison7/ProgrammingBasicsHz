/**
 * Constant that defines the trophies for each level
 */
const trophies = ["🍓", "🌽", "🧱", "🐴", "🏆"];

const scoreCap = [10, 50, 100, 150, 250];

/**
 * Constant that defines the monsters within this game
 */
const monsterImages = [
  "assets/img/horns_skull.png",
  "assets/img/fire_horns.png",
  "assets/img/green_blob.png",
  "assets/img/pink_monster.png",
  "assets/img/red_zombie.png",
];

/**
 * a Helper function that returns a random integer number between and
 * including the lower and upper limits
 *
 * @param {*} lower the lower limit of the possible result
 * @param {*} upper the upper limit of the possible result
 * @returns a random integer number between and including the lower and upper
 *   limits
 */
function randomIntBetween(lower, upper) {
  return Math.round(lower + (upper - lower) * Math.random());
}

/**
 * Initializes the app when the page is fully loaded.
 *
 * Instead placing the code outside of a function, this ensures that all expected
 * DOM elements are loaded and available. It is a good practice in Javascript,
 * and might prevent some funky errors.
 */
window.addEventListener("load", function () {
  const playfield = document.getElementById("playfield");
  // grabs the trophy element
  const trophiesList = document.getElementById("trophies");
  let score = 0;
  let trophiesIndex = 0;
  monsterImages.forEach(function (monsterImage) {
    const monster = document.createElement("img");
    monster.src = monsterImage;
    monster.classList.add("playfield_item");
    monster.style.top = randomIntBetween(0, playfield.clientHeight) + "px";
    monster.style.left = randomIntBetween(0, playfield.clientWidth) + "px";
    playfield.appendChild(monster);
    // changing from onclick to addEventListener cause the test is absolutely stupid
    monster.addEventListener("click", function (event) {
      const currentMonster = event.target;
      currentMonster.style.top =
        randomIntBetween(0, playfield.clientHeight) + "px";
      currentMonster.style.left =
        randomIntBetween(0, playfield.clientWidth) + "px";
      score++;
      if (score >= scoreCap[trophiesIndex]) {
        trophiesList.innerHTML += trophies[trophiesIndex];
        trophiesIndex++;
      }
  })});
});
