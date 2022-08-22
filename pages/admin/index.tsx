import Link from "next/link";
import React, { useState } from "react";
import EditModal from "../../components/EditModal";
import Brand from "./brand";
import Products from "./products";

const Admin = () => {
	const collectionTypes = ["products", "brand"];
	const [type, setType] = useState<string>(collectionTypes[0]);
	return (
		<div>
			<div>
				<h1 className="text-4xl px-2 bg-blue-500 text-white py-4">CMS</h1>
				<div className="flex">
					<div className="w-1/5 h-screen px-2 bg-blue-200">
						<h2 className="text-3xl text-blue-500 py-4">Collection types</h2>
						{collectionTypes.map((collectionType, index) => (
							<div
								className="py-2 px-1 rounded-md cursor-pointer hover:bg-slate-100"
								key={index}
								onClick={() => setType(collectionType)}
							>
								{collectionType}
							</div>
						))}
					</div>
					{type === "products" ? <Products /> : <Brand />}
				</div>
			</div>
		</div>
	);
};

export default Admin;
