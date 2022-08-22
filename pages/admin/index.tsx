import Link from "next/link";
import React, { useState } from "react";
import EditModal from "../../components/EditModal";
import Products from "./products";

const Admin = () => {
	const collectionTypes = ["products", "brand"];

	return (
		<div>
			<div>
				<h1 className="text-4xl px-2 bg-blue-500 text-white py-4">CMS</h1>
				<div className="flex">
					<div className="w-1/5 h-screen px-2 bg-blue-200">
						<h2 className="text-3xl text-blue-500 py-4">Collection types</h2>
						{collectionTypes.map((collectionType, index) => (
							<div className="py-2" key={index}>
								<Link href={collectionType}>
									<a className="">{collectionType}</a>
								</Link>
							</div>
						))}
					</div>
					<div className="w-4/5">
						<h2 className="text-3xl text-blue-500 p-4">products</h2>
						<Products />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
