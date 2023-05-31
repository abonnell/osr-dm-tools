"use client";
import { Box, Typography } from "@mui/material";
import styles from "./underclock.module.css";
import UnderclockCard from "@/components/UnderclockCard/UnderclockCard";
import Link from "next/link";

export default function Underclock() {
  return (
    <main className={styles.main}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        maxWidth={"70%"}
      >
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography variant="h1">THE UNDERCLOCK</Typography>
          <Typography variant="h2">Fixing the Random Encounter</Typography>
        </Box>
        <UnderclockCard />
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum modi
          iure molestiae eius ab fugiat possimus provident vero hic dolor
          accusantium ullam, non dignissimos pariatur aut soluta adipisci cumque
          rem? Delectus, ab obcaecati. Unde corporis in repellendus, ex et animi
          numquam, alias voluptates eius iste odio quaerat iusto ea dolorum!
        </Typography>
        <Link
          href="https://goblinpunch.blogspot.com/2023/04/the-underclock-fixing-random-encounter.html"
          className={styles.link}
        >
          Source
        </Link>
      </Box>
    </main>
  );
}
