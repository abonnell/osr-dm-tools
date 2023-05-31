"use client";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from "@mui/material";
import { useState, useEffect } from "react";

import { explodingSixes, rolldX } from "@/utils/dice";

export default function UnderclockCard({}) {
	const [auto, setAuto] = useState(true);
	const [countdown, setCountdown] = useState("20");
	const [countdownMax, setCountdownMax] = useState(20);

	useEffect(() => {
		if (countdown === 0) {
			// Trigger Omen
			console.log("spooky omen");
			setCountdown(3);
		}

		if (countdown < 0) {
			// Trigger Encounter
			console.log("o shit fight");
			setCountdown(countdownMax);
		}
	}, [countdown, countdownMax]);

	// const buttonConfig = ["-1", "-2", "-3", "-4", "-5", "-6"];

	const subtractFromClock = () => {
		let result = explodingSixes();
		setCountdown(countdown - result);
	};

	return (
		<Card>
			<CardMedia>sss</CardMedia>
			<CardContent>{countdown}</CardContent>
			<CardActions>
				{auto && (
					<Button onClick={() => subtractFromClock()}>
						Roll the die!
					</Button>
				)}
				{/* {buttonConfig.map((e) => {
					return (
						<Button key={e} onClick={() => subtractFromClock(e)}>
							{e}
						</Button>
					);
				})} */}
			</CardActions>
		</Card>
	);
}
