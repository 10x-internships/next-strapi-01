import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
	content: string;
}

const Button = ({ content, ...props }: Props) => {
	return (
		<button
			{...props}
			className="px-3 py-2 bg-pink-300 rounded-r-lg text-white"
		>
			{content}
		</button>
	);
};

export default Button;
