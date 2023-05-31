export function rolldX(die) {
	return Math.floor(Math.random() * die) + 1;
}

export function explodingSixes(input = 0) {
	let result = (input += rolldX(6));

	// Number is multiple of 6
	if (result % 6 === 0) {
		return explodingSixes(result);
	} else {
		return result;
	}
}
