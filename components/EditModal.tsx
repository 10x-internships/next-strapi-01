import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	product: Product;
}
const EditModal = (props: Props) => {
	const { product, setOpenModal } = props;
	return (
		<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
			<div className="bg-blue-400 relative">
				<div className="flex ">
					<button
						className="absolute top-0 right-1 p-1 cursor-pointer"
						onClick={() => setOpenModal(false)}
					>
						X
					</button>
					<Image
						width={300}
						height={300}
						src={`http://localhost:1337/uploads/thumbnail_asus_proart_26b07f21c8.jpeg`}
					/>
					<div className="px-4 py-6">
						<label htmlFor="model" className="text-white text-xs">
							Model:{" "}
						</label>
						<input
							className="w-full py-2 px-1 rounded-sm border-solid border-red-500"
							name="model"
							type="text"
							defaultValue={product.attributes.model}
						/>
						<label htmlFor="size" className="text-white text-xs">
							Size:{" "}
						</label>
						<input
							className="w-full py-2 px-1 rounded-sm border-solid border-red-500"
							name="size"
							type="text"
							defaultValue={product.attributes.size}
						/>
						<label className="text-white text-xs" htmlFor="brands">
							Brands
						</label>
						<select className="w-full py-1" name="brands" id="brands">
							<option value={product.attributes.brand.data.attributes.name}>
								{product.attributes.brand.data.attributes.name}
							</option>
							<option value="Asus">Asus</option>
							<option value="LG">LG</option>
						</select>
						<div className="flex justify-evenly my-5">
							<button className="px-4 py-1 text-white bg-red-500 rounded-lg outline-none">
								Delete
							</button>
							<button className="px-4 py-1 text-white bg-green-500 rounded-lg outline-none">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
