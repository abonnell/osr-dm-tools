import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
	title: "OSR GM Tools",
	description: "A collection of OSR GM Tools",
};

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
		<html lang="en">
			<body className={inter.className}>
				<Navbar navLinks={navLinks} />
				{children}
			</body>
		</html>
	);
}
