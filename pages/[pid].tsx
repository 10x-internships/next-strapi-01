import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import { urlBuilder } from "../utils/UrlBuilder";

const URL = "http://localhost:1337";
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { pid } = context.query;

	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				product(id:${pid}){
                    data{
                        attributes{
                          model
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
                              attributes{
                                name
                                logo{
                                  data{
                                    attributes{
                                      url
                                    }
                                  }
                                }
                              }
                            }
                          }
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
const ProductDetail = ({ data }) => {
	console.log("data: ", data);

	return (
		<MainLayout>
			<div className="px-5 py-4 flex gap-4">
				<div className="w-1/3">
					<Image
						height={500}
						width={500}
						src={urlBuilder(
							data.product.data.attributes.image.data.attributes.url
						)}
					/>
				</div>
				<div className="px-5 py-10 flex flex-col justify-between">
					<div>
						<h1 className="text-3xl">
							Màn hình {data.product.data.attributes.brand.data.attributes.name}{" "}
							{data.product.data.attributes.model}{" "}
							{data.product.data.attributes.size} inches
						</h1>
						<h2 className="my-6 text-3xl font-bold text-red-600">17.000.000</h2>
					</div>
					<div>
						<button className="px-10 py-3 bg-red-600 text-white font-bold rounded-md">
							Add to cart
						</button>
					</div>
				</div>
				<div className="w-1/6 h-fit py-4 self-center rounded-lg flex flex-col items-center justify-center border">
					<h3 className="text-3xl">Brand</h3>
					<div className="mt-10 text-center">
						<Image
							width={100}
							height={100}
							src={urlBuilder(
								data.product.data.attributes.brand.data.attributes.logo.data
									.attributes.url
							)}
						/>
						<h4 className="text-2xl">
							{data.product.data.attributes.brand.data.attributes.name}
						</h4>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProductDetail;
