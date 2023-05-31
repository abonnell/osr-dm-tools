export function rolldX(die) {
  return Math.floor(Math.random() * die) + 1;
}

export function explodingSixes(input = 0, history = []) {
  let result = input + rolldX(6);
  history = [...history, result - input];

  // Number is multiple of 6
  if (result % 6 === 0) {
    return explodingSixes(result, history);
  } else {
    return { result, history };
  }
}
