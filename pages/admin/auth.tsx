import { ApolloClient, InMemoryCache } from "@apollo/client";
import Input from "../../components/Input";
import { createUploadLink } from "apollo-upload-client";
import { LOGIN } from "../../src/services/auth";
import React, { useState } from "react";
import { useRouter } from "next/router";

const URL = "http://localhost:1337";

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	link: createUploadLink({
		uri: `${URL}/graphql`,
	}),
});

interface ILoginReq {
	identifier: string;
	password: string;
}
const initLoginReq: ILoginReq = {
	identifier: "",
	password: "",
};
const Login = () => {
	const [loginReq, setLoginReq] = useState<ILoginReq>(initLoginReq);
	const router = useRouter();
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginReq({ ...loginReq, [e.target.name]: e.currentTarget.value });
	};
	const handleLogin = () => {
		client
			.mutate({
				mutation: LOGIN,
				variables: {
					...loginReq,
				},
			})
			.then((res) => {
				localStorage.setItem("jwt", res.data.login.jwt);
				router.push("/admin");
			})
			.catch((err) => {
				console.log(err);

				alert(err.message);
			});
	};
	const onSubmit = (e) => {
		e.preventDefault();

		handleLogin();
	};
	return (
		<div className="bg-blue-400 h-screen">
			<form
				className=" bg-white rounded-md w-fit p-10 m-auto"
				onSubmit={onSubmit}
			>
				<h1 className="text-4xl">Login</h1>
				<div>
					<Input
						name="identifier"
						onChange={onChange}
						placeholder="Username"
						className="py-2 px-1 my-2 outline-none border"
					/>
				</div>
				<div>
					<Input
						name="password"
						onChange={onChange}
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
