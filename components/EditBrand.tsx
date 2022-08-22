import React, { Dispatch, SetStateAction } from "react";
import { urlBuilder } from "../utils/UrlBuilder";
import EditModal from "./EditModal";
import Image from "next/image";

interface Props {
	brand: Brand;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const EditBrand = (props: Props) => {
	const { brand, setOpenModal } = props;
	return (
		<EditModal setOpenModal={setOpenModal}>
			<form className="flex">
				<Image
					className="bg-white"
					width={300}
					height={300}
					src={urlBuilder(brand.attributes.logo.data.attributes.url)}
				/>
				<div className="px-4 py-6">
					<label htmlFor="size" className="text-white text-xs">
						Name
					</label>
					<input
						className="w-full py-2 px-1 rounded-sm border-solid border-red-500"
						name="size"
						type="text"
						defaultValue={brand.attributes.name}
					/>
					<label className="text-white text-xs" htmlFor="brands">
						Products
					</label>
					<select className="w-full py-1" name="brands" id="brands">
						<option value="Asus">Asus</option>
						<option value="LG">LG</option>
					</select>
					<input type="file" name="" id="" />
					<div className="flex justify-evenly my-5">
						<button className="px-4 py-1 text-white bg-red-500 rounded-lg outline-none">
							Delete
						</button>
						<button
							type="submit"
							className="px-4 py-1 text-white bg-green-500 rounded-lg outline-none"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</EditModal>
	);
};

export default EditBrand;
