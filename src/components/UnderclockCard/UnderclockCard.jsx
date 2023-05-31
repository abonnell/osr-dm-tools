"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Grid,
  Dialog,
} from "@mui/material";
import { useState, useEffect } from "react";

import { explodingdXs, rolldX } from "@/utils/dice";

export default function UnderclockCard() {
  // Open modal to set auto or irl roll controls
  const [auto, setAuto] = useState(true);
  const [countdown, setCountdown] = useState(20);
  const [currentUnderDie, setCurrentUnderDie] = useState(6);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);

  useEffect(() => {
    if (countdown === 0) {
      // Trigger Omen
      setCountdown(3);
    }

    if (countdown === 3) {
      setLastRoll((lastRoll) => lastRoll + " Omen!");
    }

    if (countdown < 0) {
      // Trigger Encounter
      setCountdown(20);
      setLastRoll((lastRoll) => lastRoll + " Random Encounter!");
    }
  }, [countdown]);

  // const buttonConfig = ["-1", "-2", "-3", "-4", "-5", "-6"];

  const subtractFromClock = () => {
    let { result, history } = explodingdXs(currentUnderDie);
    setCountdown(countdown - result);
    setLastRoll(history.join(", "));
  };

  const restInTheDungeon = () => {
    // Open a Modal with two choices
    // Safe rest, which is no rolls
    // Unsafe rest, 3 step slider 1-3
    // Encounter ends the rest early
    // Note to cross off a ration
    // Increase die size
  };

  // TODO
  const triggerOmen = () => {};

  // TODO
  const triggerEncounter = () => {};

  return (
    <Grid container spacing={2} sx={{ padding: "1rem 0 1rem 0" }}>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        open={dialogIsOpen}
      ></Dialog>
      {/* Counter Card */}
      <Grid item xs={6}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ height: "100%" }}>
            <Typography
              variant="h1"
              component="h3"
              sx={{ textAlign: "center", mt: "2rem" }}
            >
              {countdown}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Actions Card */}
      <Grid item xs={6}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h4" component="h3">
              Previous Result:
            </Typography>
            <Typography variant="h4" component="h3">
              {lastRoll ?? "..."}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {auto && (
              <>
                <Button onClick={() => subtractFromClock()}>
                  <Typography>Roll the die!</Typography>
                </Button>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Typography>Rest in the dungeon!</Typography>
                </Button>
              </>
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
      </Grid>
    </Grid>
  );
}
