const URL = "http://localhost:1337";

export const SearchProduct = async (inputText: string) => {
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
        products(filters: {model: {contains: "24"}, brand:{name:{contains: ""}}}){
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
	return data;
};
