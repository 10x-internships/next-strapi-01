import { gql } from "@apollo/client";

const URL = "http://localhost:1337";

export const FetchBrands = async () => {
	const params = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: `{
                brands{
                    meta{
                      pagination{
                        pageCount
                        total
                      }
                    }
                    data{
                      id
                      attributes{
                        name
                        logo{
                          data{
                            id
                            attributes{
                              url
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
export const UPDATEBRAND = gql`
	mutation ($name: String, $id: ID, $logo: ID) {
		updateBrand(id: $id, data: { logo: $logo, name: $name }) {
			data {
				id
				attributes {
					name
					logo {
						data {
							id
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const CREATEBRAND = gql`
	mutation ($name: String, $logo: ID) {
		createBrand(data: { name: $name, logo: $logo }) {
			data {
				id
				attributes {
					name
					logo {
						data {
							id
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;
export const DeleteBrand = gql`
	mutation ($id: ID!) {
		deleteBrand(id: $id) {
			data {
				id
			}
		}
	}
`;
