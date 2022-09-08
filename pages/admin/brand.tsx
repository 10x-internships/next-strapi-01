import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EditBrand from "../../components/modal/EditBrand";
import { FetchBrands } from "../../src/services/brand";

const blankBrand: Brand = {
	id: "",
	attributes: {
		name: "",
		logo: {
			data: {
				id: "",
				attributes: {
					url: "",
				},
			},
		},
	},
};
const Brand = () => {
	const [brands, setBrands] = useState<Array<Brand>>([]);
	const [brandSelected, setBrandSelected] = useState<Brand>(undefined);
	const [openModal, setOpenModel] = useState<boolean>(false);
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
	useEffect(() => {
		FetchBrands().then((data) => setBrands(data.brands.data));
	}, []);
	const handleSelectBrand = (brand: Brand) => {
		setBrandSelected(brand);
		setOpenModel((prev) => !prev);
	};
	return (
		<div className="w-4/5">
			<div>
				<h2 className="text-3xl text-blue-500 p-4">Brands</h2>
				<Button
					content={"Add new brand"}
					onClick={() => setOpenCreateModal(true)}
				/>
			</div>
			<div className="grid grid-cols-4">
				{brands.map((brand, index) => (
					<Card
						key={index}
						name={brand.attributes.name}
						imgUrl={brand.attributes.logo?.data?.attributes.url}
						onClick={() => handleSelectBrand(brand)}
					/>
				))}
			</div>
			{openModal ? (
				<EditBrand
					setOpenModal={setOpenModel}
					brand={brandSelected}
					isCreate={false}
				/>
			) : null}
			{openCreateModal ? (
				<EditBrand
					setOpenModal={setOpenCreateModal}
					brand={blankBrand}
					isCreate={true}
				/>
			) : null}
		</div>
	);
};

export default Brand;
