import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
	content: string;
}

const Button = ({ content, ...props }: Props) => {
	return (
		<button
			{...props}
			className="px-3 py-2 rounded-r-lg text-white bg-pink-300"
		>
			{content}
		</button>
	);
};

export default Button;
