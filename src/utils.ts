// shuffles an array with Fisher-Yates (aka Knuth) Shuffle.
// see https://stackoverflow.com/a/2450976
const shuffleArray = (array: number[]) => {
  const copy = [...array];
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
  }

  return copy;
};

export { shuffleArray };
