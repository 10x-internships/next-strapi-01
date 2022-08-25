import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EditProduct from "../../components/modal/EditProduct";
import Pagination from "../../components/Pagination";
import { FetchProducts } from "../../src/services/product";

const blankProduct: Product = {
	id: "",
	attributes: {
		size: 0,
		model: "",
		image: {
			data: {
				id: "30",
				attributes: {
					url: "",
				},
			},
		},
		brand: {
			data: {
				id: "1",
				attributes: {
					name: "",
				},
			},
		},
	},
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
const Products = () => {
	const [products, setProducts] = useState<Array<Product>>([]);
	const [currentPage, setCurrentPage] = useState<string>("1");
	const [productsData, setProductsData] =
		useState<ProductsData>(initProductsData);
	const [openEditModal, setOpenEditModal] = useState<boolean>(false);
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
	const [productSelected, setProductSelected] = useState<Product>(undefined);

	useEffect(() => {
		FetchProducts().then((data) => {
			setProductsData(data.data.products);
			setProducts(data.data.products.data);
		});
	}, []);

	useEffect(() => {
		FetchProducts(currentPage).then((data) =>
			setProducts(data.data.products.data)
		);
	}, [currentPage]);

	const handleSelectProduct = (product: Product) => {
		setProductSelected(product);
		setOpenEditModal(true);
	};

	const paginate = (pageNumber: number) => {
		setCurrentPage(`${pageNumber}`);
	};

	return (
		<div className="w-4/5">
			<h2 className="text-3xl text-blue-500 p-4">Products</h2>
			<Button
				content={"Add new product"}
				onClick={() => setOpenCreateModal(true)}
			/>
			<div className="grid grid-cols-4">
				{products.map((product, index) => (
					<Card
						key={index}
						name={`Màn hình ${product.attributes.brand.data.attributes.name} 
					${product.attributes.model} ${product.attributes.size} Inches`}
						imgUrl={product.attributes.image.data.attributes.url}
						onClick={() => handleSelectProduct(product)}
					/>
				))}
			</div>
			<Pagination
				numOfPages={productsData.meta.pagination.pageCount}
				paginate={paginate}
			/>
			{openEditModal ? (
				<EditProduct
					setOpenModal={setOpenEditModal}
					product={productSelected}
					isCreate={false}
				/>
			) : null}
			{openCreateModal ? (
				<EditProduct
					setOpenModal={setOpenCreateModal}
					product={blankProduct}
					isCreate={true}
				/>
			) : null}
		</div>
	);
};

export default Products;
