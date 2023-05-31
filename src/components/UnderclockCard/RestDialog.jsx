import {
  Dialog,
  Typography,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Button,
  Progress,
} from "@mui/material";
import { useState } from "react";

export default function RestDialog({
  isDialogOpen,
  dialogClose,
  handleRest,
  hasRestFinished,
  resetHasRestFinished,
}) {
  const [dangerLevel, setDangerLevel] = useState(2);
  const [safeRest, setSafeRest] = useState(true);
  const [resting, setResting] = useState(false);

  const fullDialogClose = () => {
    setSafeRest(true);
    setResting(false);
    resetHasRestFinished();
    setDangerLevel(2);
    setTimeout(() => dialogClose(), 300);
  };

  const handleChange = (e) => {
    const isRestSafe = e.target.value === "safe" ? true : false;
    setSafeRest(isRestSafe);
  };

  const submitRest = () => {
    /*
      -1: Encounter
      0: Omen
      1: Rest
    */
    handleRest(dangerLevel);
    setResting(true);
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => fullDialogClose()}>
      {/* Rest not attempted */}
      {resting === false && (
        <>
          <DialogTitle>
            <Typography>{`So You're Resting In The Dungeon?`}</Typography>
          </DialogTitle>
          {/* Only displays selection if null, make sure to set to null on close */}
          <FormControl>
            <FormLabel id="rest-modal=label">Is This A Safe Rest?</FormLabel>
            <RadioGroup
              aria-labelledby="rest-modal-label"
              defaultValue="safe"
              name="rest-modal-group"
              row
              onChange={handleChange}
            >
              <FormControlLabel value="safe" control={<Radio />} label="Safe" />
              <FormControlLabel
                value="not-safe"
                control={<Radio />}
                label="Not Safe"
              />
            </RadioGroup>
            {/* slider */}
            {safeRest === false && (
              <>
                <Slider
                  aria-label="danger level"
                  defaultValue="2"
                  getAriaValueText={(value) => `level ${value} danger`}
                  step={1}
                  min={1}
                  max={3}
                  marks={[
                    { value: 1, label: "Low Danger" },
                    { value: 2, label: "Medium Danger" },
                    { value: 3, label: "High Danger" },
                  ]}
                  onChange={(e) => {
                    setDangerLevel(e.target.value);
                  }}
                />
                <Button onClick={submitRest}>
                  <Typography>Rest</Typography>
                </Button>
              </>
            )}
          </FormControl>
        </>
      )}
      {/* Rest failed due to encounter */}
      {resting === true && (
        <>
          {hasRestFinished === -1 && (
            <Typography>{`Spooky scary skeletons (Encounter)`}</Typography>
          )}
          {hasRestFinished === 0 && (
            <Typography>{`Success but omen`}</Typography>
          )}
          {hasRestFinished === 1 && (
            <Typography>{`Rest successful`}</Typography>
          )}
        </>
      )}
    </Dialog>
  );
}
