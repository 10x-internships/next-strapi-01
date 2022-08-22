import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import EditModal from "../../components/EditModal";
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
		<div>
			<div className="grid grid-cols-4">
				{products.map((product, index) => (
					<Card
						key={index}
						product={product}
						onClick={() => handleSelectProduct(product)}
					/>
				))}
			</div>
			{openModal ? (
				<EditModal setOpenModal={setOpenModel} product={productSelected} />
			) : null}
		</div>
	);
};

export default Products;
