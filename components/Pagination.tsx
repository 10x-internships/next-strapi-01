const Pagination = ({ numOfPages, paginate }) => {
	const pages = [];
	for (let i = 1; i <= numOfPages; i++) {
		pages.push(i);
	}
	return (
		<nav className="">
			<ul className="flex">
				{pages.map((number) => (
					<li key={number} className="p-2 border text-cyan-600">
						<a onClick={() => paginate(number)}>{number}</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
