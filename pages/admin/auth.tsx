import Input from "../../components/Input";

const Login = () => {
	return (
		<div className="bg-blue-400 h-screen">
			<form className=" bg-white rounded-md w-fit p-10 m-auto">
				<h1 className="text-4xl">Login</h1>
				<div>
					<Input
						placeholder="Username"
						className="py-2 px-1 my-2 outline-none border"
					/>
				</div>
				<div>
					<Input
						placeholder="Password"
						className="py-2 px-1 my-2 outline-none border"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="bg-blue-400 text-white px-3 py-2 w-full"
					>
						LOGIN
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
