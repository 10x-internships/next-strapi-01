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
export const UpdateBrand = async () => {
	const params = {};
};

export const CreateBrand = async () => {
	const params = {};
};
export const DeleteBrand = async () => {
	const params = {};
};
