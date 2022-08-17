import React from "react";
import Header from "../Header";

interface Props {
	children?: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default MainLayout;
