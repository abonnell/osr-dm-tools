"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";

import theme from "../../theme";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
// 	title: "OSR GM Tools",
// 	description: "A collection of OSR GM Tools",
// };

const navLinks = {
	0: {
		key: "Home",
		path: "/",
	},
	1: {
		key: "Underclock",
		path: "/underclock",
	},
};

export default function RootLayout({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<html lang="en">
				<body className={inter.className}>
					<Navbar navLinks={navLinks} />
					{children}
				</body>
			</html>
		</ThemeProvider>
	);
}
