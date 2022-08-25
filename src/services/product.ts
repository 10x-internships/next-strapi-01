import { gql } from "@apollo/client";

const URL = "http://localhost:1337";

export const SearchProduct = async (inputText: string) => {
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				products(filters: {model: {containsi: ${inputText}}}){
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
				
					  }
					}
				  }
      }
        `,
		}),
	};
	const res = await fetch(`${URL}/graphql`, params);
	const data = await res.json();

	return data.data;
};
export const FetchProducts = async (currentPage: string | string[] = `1`) => {
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
							id
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
					  }
					}
				}
				  }
			`,
		}),
	};
	const res = await fetch(`${URL}/graphql`, params);
	const data = await res.json();
	return data;
};
export const FetchProduct = async (id: string) => {
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				product(id:${id}){
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
	return data;
};
interface ProductInput {
	id: string;
	data?: {
		model?: string;
		size?: number;
		image?: string;
		brand?: string;
	};
}
export const UpdateProduct = async (reqBody: ProductInput) => {
	const { id } = reqBody;
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				updateProduct(
					id: ${id}
					data: ${reqBody.data}
				  ){
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
						}
					  }
				  }
				  }
			`,
		}),
	};
	const res = await fetch(`${URL}/graphql`, params);
	const data = await res.json();
	return data;
};
export const DeleteProduct = async (id: string) => {
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			mutation: `{
				deleteProduct(
				  id: ${id}
				){
				  data{
					id
				  }
				}
			  }`,
		}),
	};
	const res = await fetch(`${URL}/graphql`, params);
	const data = await res.json();
	return data;
};

export const DELETE = gql`
	mutation ($id: ID!) {
		deleteProduct(id: $id) {
			data {
				id
			}
		}
	}
`;
export const UPLOAD = gql`
	mutation ($file: Upload!) {
		upload(file: $file) {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;
export const CREATE = gql`
	mutation createProduct($model: String, $size: Float, $brand: ID, $image: ID) {
		createProduct(
			data: { model: $model, size: $size, brand: $brand, image: $image }
		) {
			data {
				id
				attributes {
					model
					size
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
