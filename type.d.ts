declare interface Product {
	id: string;
	attributes: {
		size: number;
		model: string;
		image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		brand: {
			data: {
				attributes: {
					name: string;
				};
			};
		};
	};
}
