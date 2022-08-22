import { createContext, ReactNode, useContext, useState } from "react";

type productsContextType = {
	productsData: ProductsData;
	updateProductsData: (data: ProductsData) => void;
};
type Props = {
	children: ReactNode;
};
const initProductsData = {
	data: [],
	meta: {
		pagination: {
			pageCount: 0,
			total: 0,
		},
	},
};
const searchContextDefaultValues: productsContextType = {
	productsData: initProductsData,
	updateProductsData: (data: ProductsData) => {},
};
const ProductContext = createContext<productsContextType>(
	searchContextDefaultValues
);

export function useProduct() {
	return useContext(ProductContext);
}

export function ProductProvider({ children }: Props) {
	const [productsData, setProductsData] =
		useState<ProductsData>(initProductsData);

	const updateProductsData = (data: ProductsData) => {
		setProductsData(data);
	};
	const value = {
		productsData,
		updateProductsData,
	};
	return (
		<>
			<ProductContext.Provider value={value}>
				{children}
			</ProductContext.Provider>
		</>
	);
}
