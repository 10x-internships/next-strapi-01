import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Card from "../components/Card";
import MainLayout from "../components/Layout/MainLayout";
import Pagination from "../components/Pagination";

const URL = "http://localhost:1337";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const currentPage = context.query.page || 1;

	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				products(pagination: { page: ${currentPage}, pageSize: 10 }){
					meta{
						pagination{
						  pageCount
						  total
						}
					  }
					data{
					  id
					  attributes{
						size
						image{
						  data{
							attributes{
							  url
							}
						  }
						}
						brand{
						  data{
							id
							attributes{
							  name
							}
						  }
						}
						model
						createdAt
						updatedAt
					  }
					}
				}
				  }
			`,
		}),
	};
	const res = await fetch(`${URL}/graphql`, params);
	const data = await res.json();

	return {
		props: data,
	};
};

export default function Home({ data }) {
	const router = useRouter();
	const products: Array<Product> = data.products.data;
	const paginate = (pageNumber) => router.push(`?page=${pageNumber}`);
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
							<Card key={index} product={product} />
						))}
					</div>
					<div className="">
						<Pagination numOfPages={2} paginate={paginate} />
					</div>
				</>
			</MainLayout>
		</div>
	);
}
