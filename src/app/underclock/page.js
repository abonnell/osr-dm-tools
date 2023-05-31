import styles from "./underclock.module.css";
import UnderclockCard from "@/components/UnderclockCard/UnderclockCard";

export default function Underclock() {
	return (
		<main className={styles.main}>
			<UnderclockCard />
		</main>
	);
}
