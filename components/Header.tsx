import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import { SearchProduct } from "../src/services/product";
import { createUploadLink } from "apollo-upload-client";
import { useProduct } from "../store/ProductsContext";
import Button from "./Button";
import Input from "./Input";

const URL = "http://localhost:1337";

const Header = () => {
	const [search, setSearch] = useState<string>("");
	const { productsData, updateProductsData } = useProduct();

	const cache = new InMemoryCache();

	const client = new ApolloClient({
		cache,
		link: createUploadLink({
			uri: `${URL}/graphql`,
		}),
	});
	const SEARCH = gql`
		query ($text: String) {
			products(filters: { model: { containsi: $text } }) {
				meta {
					pagination {
						pageCount
						total
					}
				}
				data {
					id
					attributes {
						size
						model
						image {
							data {
								attributes {
									url
								}
							}
						}
						brand {
							data {
								id
								attributes {
									name
								}
							}
						}
					}
				}
			}
		}
	`;
	const handleSearch = async () => {
		client
			.mutate({
				mutation: SEARCH,
				variables: {
					text: search,
				},
			})
			.then((res) => {
				updateProductsData(res.data.products);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<header className="px-6 py-6 bg-blue-500 flex items-center">
			<Link href="/">
				<a className="text-3xl font-bold text-white border px-2 py-2 border-white rounded-full">
					e-Commerce
				</a>
			</Link>
			<div className="grow mx-20">
				<Input
					className="px-3 py-2 rounded-l-lg w-1/3 outline-none"
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<Button content="Search" onClick={handleSearch} />
			</div>
		</header>
	);
};

export default Header;
