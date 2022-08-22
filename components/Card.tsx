import Image from "next/image";
import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";
import { urlBuilder } from "../utils/UrlBuilder";

interface Props extends HTMLAttributes<HTMLDivElement> {
	imgUrl: string;
	name: string;
}

const Card = ({ imgUrl, name, ...props }: Props) => {
	return (
		<div className="w-56 h-72 hover:shadow-lg cursor-pointer m-6" {...props}>
			<Image height={370} width={380} src={urlBuilder(imgUrl)} />
			<div className="px-2 py-1">
				<h2 className="text-md truncate"></h2>
				<h3 className="text-red-500 text-xl">17.000.000</h3>
			</div>
		</div>
	);
};

export default Card;
