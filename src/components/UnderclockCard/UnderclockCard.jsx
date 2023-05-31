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
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";

import { explodingdXs, rolldX } from "@/utils/dice";
import RestDialog from "./RestDialog";

export default function UnderclockCard() {
  // Open modal to set auto or irl roll controls
  const [auto, setAuto] = useState(true);
  const [countdown, setCountdown] = useState(20);
  const [currentUnderDie, setCurrentUnderDie] = useState(6);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);
  const [eventTriggered, setEventTriggered] = useState([
    { encounter: false },
    { omen: false },
  ]);

  /*
    -1: Encounter
    0: Omen
    1: Rest
 */
  const [hasRestFinished, setHasRestFinished] = useState(1);

  // Countdown effect handler
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(3);
    }

    if (countdown === 3) {
      // Trigger Omen
      setLastRoll((lastRoll) => lastRoll + " Omen!");
      setEventTriggered([{ encounter: false }, { omen: true }]);
    }

    if (countdown < 0) {
      // Trigger Encounter
      setCountdown(20);
      setLastRoll((lastRoll) => lastRoll + " Random Encounter!");
      setEventTriggered([{ encounter: true }, { omen: false }]);
    }
  }, [countdown]);

  // Encounter effect handler
  useEffect(() => {
    const [encounter, omen] = eventTriggered;

    if (encounter.encounter === true) {
      // Handle encounter
      setEventTriggered([{ encounter: false }, { omen: false }]);
      setHasRestFinished(-1);
    }

    if (omen.omen === true) {
      // Handle omen
      setEventTriggered([{ encounter: false }, { omen: false }]);
      setHasRestFinished(0);
    }
  }, [eventTriggered]);

  // const buttonConfig = ["-1", "-2", "-3", "-4", "-5", "-6"];

  const subtractFromClock = () => {
    let { result, history } = explodingdXs(currentUnderDie);
    setCountdown(countdown - result);
    setLastRoll(history.join(", "));
  };

  const handleRest = (dangerLevel) => {
    // Issue is that setState is being called in a loop and the requests are stacking too hard
    // Don't do it in a loop?
    let restHistory = [];
    let restResult = 0;
    let flatHist = [];

    for (let index = 0; index < dangerLevel; index++) {
      const { result, history } = explodingdXs(currentUnderDie);
      restResult += result;
      restHistory = [...restHistory, history];
    }
    restHistory.forEach((e) => {
      if (e.length === 1) flatHist.push(e[0]);
      if (e.length === 2) {
        e.forEach((ee) => {
          flatHist.push(ee);
        });
      }
    });
    setCountdown(countdown - restResult);
    setLastRoll(flatHist.join(", "));
  };

  const dialogClose = () => {
    setIsDialogOpen(false);
  };

  // TODO
  const triggerOmen = () => {};

  // TODO
  const triggerEncounter = () => {};

  return (
    <Grid container spacing={2} sx={{ padding: "1rem 0 1rem 0" }}>
      <RestDialog
        isDialogOpen={isDialogOpen}
        dialogClose={dialogClose}
        handleRest={handleRest}
        hasRestFinished={hasRestFinished}
        resetHasRestFinished={() => setHasRestFinished(1)}
      />
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
                <Button
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
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
