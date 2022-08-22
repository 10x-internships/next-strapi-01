import React, { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
const Modal = ({ children }: Props) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
			{children}
		</div>
	);
};

export default Modal;
