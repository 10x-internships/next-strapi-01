import Link from "next/link";
import React from "react";
import Button from "./Button";
import Input from "./Input";

const Header = () => {
	return (
		<header className="px-6 py-6 bg-blue-500 flex items-center">
			<Link href="/">
				<a className="text-3xl font-bold text-white border px-2 py-2 border-white rounded-full">
					e-Commerce
				</a>
			</Link>
			<div className="grow mx-20">
				<Input />
				<Button content="Search" />
			</div>
		</header>
	);
};

export default Header;
