import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import EditModal from "./EditModal";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { urlBuilder } from "../utils/UrlBuilder";

const URL = "http://localhost:1337";

interface Props {
	product: Product;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
}
const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	link: createUploadLink({
		uri: `${URL}/graphql`,
	}),
});
const UPLOAD = gql`
	mutation ($file: Upload!) {
		upload(file: $file) {
			name
		}
	}
`;
const EditProduct = (props: Props) => {
	const { product, setOpenModal } = props;
	const [file, setFile] = useState<File>(null);

	const onImageChange = (event) => {
		console.log(event.target.files[0]);

		setFile(event.target.files[0]);
		console.log(file);
	};
	const onSubmit = async (e) => {
		console.log("file: ", file);

		e.preventDefault();
		client
			.mutate({
				mutation: UPLOAD,
				variables: {
					file: file,
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<EditModal setOpenModal={setOpenModal}>
			<form className="flex" onSubmit={onSubmit}>
				<Image
					width={300}
					height={300}
					src={urlBuilder(product.attributes.image.data.attributes.url)}
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
					<input type="file" name="" id="" onChange={onImageChange} />
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

export default EditProduct;
