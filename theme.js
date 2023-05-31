import { createTheme } from "@mui/material";
import { red, black } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#ffc107",
		},
		secondary: {
			main: "#448aff",
		},
		warning: {
			main: "#ed6c02",
		},
		info: {
			main: "#0288d1",
		},
	},
});

export default theme;
