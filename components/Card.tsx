import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { urlBuilder } from "../utils/UrlBuilder";

interface Props {
	product: Product;
}

const Card = ({ product }: Props) => {
	const router = useRouter();

	return (
		<div
			className="w-56 h-72 hover:shadow-lg cursor-pointer m-6"
			onClick={() => router.push(`/${product.id}`)}
		>
			<Image
				height={370}
				width={380}
				src={urlBuilder(product.attributes.image.data.attributes.url)}
			/>
			<div className="px-2 py-1">
				<h2 className="text-md truncate">
					Màn hình&nbsp;{product.attributes.brand.data.attributes.name}&nbsp;
					{product.attributes.model}&nbsp;{product.attributes.size}
				</h2>
				<h3 className="text-red-500 text-xl">17.000.000</h3>
			</div>
		</div>
	);
};

export default Card;
