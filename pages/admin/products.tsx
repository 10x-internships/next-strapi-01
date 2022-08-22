import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import EditProduct from "../../components/EditProduct";
import { FetchProducts } from "../../src/services/product";

const Products = () => {
	const [products, setProducts] = useState<Array<Product>>([]);
	const [openModal, setOpenModel] = useState<boolean>(false);
	const [productSelected, setProductSelected] = useState<Product>(undefined);

	useEffect(() => {
		FetchProducts().then((data) => setProducts(data.data.products.data));
	}, []);
	const handleSelectProduct = (product: Product) => {
		setProductSelected(product);
		setOpenModel((prev) => !prev);
	};
	return (
		<div className="w-4/5">
			<h2 className="text-3xl text-blue-500 p-4">Products</h2>
			<div className="grid grid-cols-4">
				{products.map((product, index) => (
					<Card
						key={index}
						name={`Màn hình ${product.attributes.brand.data.attributes.name} 
					${product.attributes.model} ${product.attributes.size}`}
						imgUrl={product.attributes.image.data.attributes.url}
						price="11.000.000"
						onClick={() => handleSelectProduct(product)}
					/>
				))}
			</div>
			{openModal ? (
				<EditProduct setOpenModal={setOpenModel} product={productSelected} />
			) : null}
		</div>
	);
};

export default Products;
