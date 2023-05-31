export function rolldX(die) {
  return Math.floor(Math.random() * die) + 1;
}

export function explodingdXs(dieSize, input = 0, history = []) {
  let result = input + rolldX(dieSize);
  history = [...history, result - input];

  // Number is multiple of 6
  if (result % 6 === 0) {
    return explodingdXs(dieSize, result, history);
  } else {
    return { result, history };
  }
}
