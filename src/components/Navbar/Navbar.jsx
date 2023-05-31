"use client";
import Link from "next/link";
import { AppBar, Container, Toolbar, Box, Button } from "@mui/material";
import { usePathname } from "next/navigation";

import styles from "./navbar.module.css";

export default function Navbar({ navLinks }) {
	const navArr = Object.values(navLinks);
	const path = usePathname();

	return (
		<AppBar>
			<Container>
				<Toolbar>
					{/* Icon */}
					<Box>
						{navArr.map((item, index) => {
							const classes = `${styles.navItem} ${
								path === item.path ? styles.currentPage : ""
							}`;
							return (
								<Link
									key={`${item.key}-${index}`}
									href={item.path}
									className={classes}
								>
									{item.key.toUpperCase()}
								</Link>
							);
						})}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
