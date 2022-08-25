import { useState } from "react";

const Pagination = ({ numOfPages, paginate }) => {
	const [pageSelected, setPageSelected] = useState<number>(1);
	const pages: Array<number> = [];

	for (let i = 1; i <= numOfPages; i++) {
		pages.push(i);
	}

	const onClick = (pageNum: number) => {
		setPageSelected(pageNum);
		paginate(pageNum);
	};
	return (
		<nav className="">
			<ul className="flex">
				{pages.map((number) => (
					<li
						key={number}
						className={`p-2 border text-cyan-600 cursor-pointer hover:bg-slate-100 ${
							number === pageSelected && `bg-slate-300`
						}`}
					>
						<a onClick={() => onClick(number)}>{number}</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
