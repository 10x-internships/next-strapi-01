declare interface Product {
	id: string;
	attributes: {
		size: number;
		model: string;
		image: {
			data: {
				id: string;
				attributes: {
					url: string;
				};
			};
		};
		brand: {
			data: {
				id: string;
				attributes: {
					name: string;
				};
			};
		};
	};
}
declare interface ProductsData {
	data: Array<Product>;
	meta: {
		pagination: {
			pageCount: number;
			total: number;
		};
	};
}

declare interface Brand {
	id: string;
	attributes: {
		name: string;
		logo: {
			data: {
				id: string;
				attributes: {
					url: string;
				};
			};
		};
	};
}
