import Link from "next/link";
import React, { useState } from "react";
import { SearchProduct } from "../src/services/product";
import { useProduct } from "../store/ProductsContext";
import Button from "./Button";
import Input from "./Input";

const Header = () => {
	const [search, setSearch] = useState<string>("");
	const { productsData, updateProductsData } = useProduct();
	const handleSearch = async () => {
		const { products } = await SearchProduct(search);
		updateProductsData(products);
	};
	return (
		<header className="px-6 py-6 bg-blue-500 flex items-center">
			<Link href="/">
				<a className="text-3xl font-bold text-white border px-2 py-2 border-white rounded-full">
					e-Commerce
				</a>
			</Link>
			<div className="grow mx-20">
				<Input
					className="px-3 py-2 rounded-l-lg w-1/3 outline-none"
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<Button content="Search" onClick={handleSearch} />
			</div>
		</header>
	);
};

export default Header;
