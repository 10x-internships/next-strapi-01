import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import MainLayout from "../components/Layout/MainLayout";
import Pagination from "../components/Pagination";
import { FetchProducts } from "../src/services/product";
import { useProduct } from "../store/ProductsContext";

const URL = "http://localhost:1337";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const currentPage = context.query.page;
	const data = FetchProducts(currentPage);

	return {
		props: data,
	};
};

export default function Home({ data }) {
	const router = useRouter();
	const { productsData, updateProductsData } = useProduct();
	const [products, setProducts] = useState<Array<Product>>(productsData.data);

	useEffect(() => {
		updateProductsData(data.products);
	}, [data]);

	useEffect(() => {
		setProducts(productsData.data);
	}, [productsData]);

	const paginate = (pageNumber: number) => {
		router.push(`?page=${pageNumber}`);
		setProducts(data.products.data);
	};
	return (
		<div>
			<Head>
				<title>e-Commerce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MainLayout>
				<>
					<div className="grid grid-cols-5">
						{products.map((product, index) => (
							<Card
								key={index}
								product={product}
								onClick={() => router.push(`/${product.id}`)}
							/>
						))}
					</div>
					<div className="">
						<Pagination
							numOfPages={productsData.meta.pagination.pageCount}
							paginate={paginate}
						/>
					</div>
				</>
			</MainLayout>
		</div>
	);
}
