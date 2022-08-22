import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: Props) => {
	return (
		<input
			{...props}
			type="text"
		/>
	);
};

export default Input;
