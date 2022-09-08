import React, { Dispatch, SetStateAction, useState } from "react";
import { urlBuilder } from "../../utils/UrlBuilder";
import EditModal from "./EditModal";
import Image from "next/image";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { CREATEBRAND, DeleteBrand } from "../../src/services/brand";
import { UPLOAD } from "../../src/services/product";

const URL = "http://localhost:1337";
interface Props {
	brand: Brand;
	isCreate: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
}
interface initBrandInput {
	name: string;
	image: string;
}
const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	link: createUploadLink({
		uri: `${URL}/graphql`,
	}),
});

const EditBrand = (props: Props) => {
	const { brand, isCreate, setOpenModal } = props;
	const initBrand: initBrandInput = {
		name: brand.attributes.name,
		image: brand.attributes.logo.data.id,
	};
	const [file, setFile] = useState<File>(null);
	const [brands, setBrands] = useState<Array<Brand>>([]);
	const [modifiedBrand, setModifiedBrand] = useState(initBrand);
	const onSubmit = async (e) => {
		e.preventDefault();

		client
			.mutate({
				mutation: UPLOAD,
				variables: {
					file: file,
				},
			})
			.then((res) => {
				client
					.mutate({
						mutation: CREATEBRAND,
						variables: {
							...modifiedBrand,
						},
					})
					.then((res) => {
						setOpenModal(false);
					})
					.catch((err) => {
						console.error(err);
					});
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const handleDeleteBrand = (id: string) => {
		console.log(id);

		client
			.mutate({
				mutation: DeleteBrand,
				variables: {
					id: id,
				},
			})
			.then((res) => {
				setOpenModal(false);
			})
			.catch((err) => {
				alert(err);
			});
	};
	return (
		<EditModal setOpenModal={setOpenModal}>
			<form className="flex" onSubmit={onSubmit}>
				<Image
					className="bg-white"
					width={300}
					height={300}
					src={urlBuilder(brand.attributes.logo.data.attributes.url)}
				/>
				<div className="px-4 py-6 max-w-sm">
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
						Image
					</label>
					<input type="file" name="" id="" />
					<div className="flex justify-evenly my-5">
						<button
							className="px-4 py-1 text-white bg-red-500 rounded-lg outline-none"
							type="button"
							disabled={isCreate}
							onClick={() => handleDeleteBrand(brand.id)}
						>
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
