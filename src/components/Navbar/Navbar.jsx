import Link from "next/link";

export default function Navbar({ navLinks }) {
	const navArr = Object.values(navLinks);
	return (
		<div>
			{navArr.map((item, index) => {
				console.log(item);
				return (
					<Link key={`${item.key}-${index}`} href={item.path}>
						{item.key}
					</Link>
				);
			})}
		</div>
	);
}
