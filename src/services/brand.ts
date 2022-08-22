const URL = "http://localhost:1337";

export const FetchBrand = async () => {
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
