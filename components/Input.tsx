import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
	name?: string;
}

const Input = ({ ...props }: Props) => {
	return <input {...props} name={props.name} type="text" />;
};

export default Input;
