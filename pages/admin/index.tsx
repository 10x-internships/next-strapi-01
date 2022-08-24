import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditModal from "../../components/modal/EditModal";
import Pagination from "../../components/Pagination";
import Brand from "./brand";
import Products from "./products";

const Admin = () => {
	const router = useRouter();
	useEffect(() => {
		if (!localStorage.getItem("jwt")) {
			router.push("admin/auth");
			// console.log("sdfsfdsd");
		}
	}, []);
	const collectionTypes = ["products", "brand"];
	const [type, setType] = useState<string>(collectionTypes[0]);
	return (
		<div>
			<div>
				<h1 className="text-4xl px-2 bg-blue-500 text-white py-4">CMS</h1>
				<div className="flex">
					<div className="w-1/5 h-full px-2 border-r-2 border-blue-900">
						<h2 className="text-3xl text-blue-500 py-4">Collection types</h2>
						{collectionTypes.map((collectionType, index) => (
							<div
								className={`py-2 px-1 rounded-md cursor-pointer hover:bg-slate-100 ${
									type === collectionType
										? `font-bold text-blue-300 bg-slate-200`
										: ``
								}`}
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
