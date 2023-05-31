"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

import { explodingSixes, rolldX } from "@/utils/dice";

export default function UnderclockCard() {
  // Open modal to set auto or irl roll controls
  const [auto, setAuto] = useState(true);
  const [countdown, setCountdown] = useState("20");
  const [countdownMax, setCountdownMax] = useState(20);

  const [lastRoll, setLastRoll] = useState(null);

  useEffect(() => {
    if (countdown === 0) {
      // Trigger Omen
      setCountdown(3);
    }

    if (countdown < 0) {
      // Trigger Encounter
      setCountdown(countdownMax);
    }
  }, [countdown, countdownMax]);

  // const buttonConfig = ["-1", "-2", "-3", "-4", "-5", "-6"];

  const subtractFromClock = () => {
    let { result, history } = explodingSixes();
    setCountdown(countdown - result);
    setLastRoll(history.join(", "));
  };

  // TODO
  const triggerOmen = () => {};

  // TODO
  const triggerEncounter = () => {};

  return (
    <Box
      sx={{
        p: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      {/* pls be same height */}
      {/* its some pb disparity */}
      <Card>
        <CardContent>
          <Typography variant="h2">{countdown}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Previous Result:</Typography>
          <Typography>{lastRoll ?? "..."}</Typography>
        </CardContent>
        <CardActions>
          {auto && (
            <Button onClick={() => subtractFromClock()}>
              <Typography>Roll the die!</Typography>
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
    </Box>
  );
}
