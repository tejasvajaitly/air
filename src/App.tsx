import { useState, useEffect } from "react";
import LikedTracks from "./LikedTracks";
import sdk from "./spotify";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
	await sdk.authenticate();
}

function App() {
	const [isAuth, setIsAuth] = useState(false);

	const handleLoginStatus = async () => {
		const accessToken = await sdk.getAccessToken();
		accessToken ? setIsAuth(true) : setIsAuth(false);
	};

	useEffect(() => {
		handleLoginStatus();
	});

	const login = async () => {
		await sdk.authenticate();
	};

	const logout = () => {
		sdk.logOut();
		handleLoginStatus();
	};

	return (
		<div className='h-full w-[45vw] mx-auto flex flex-col gap-2'>
			<nav className=' flex-[8] bg-main rounded-lg flex flex-row justify-end items-center px-2'>
				{isAuth ? (
					<button onClick={logout}>logout</button>
				) : (
					<button onClick={login}>login to spotify</button>
				)}
			</nav>
			<div className=' flex-[92] bg-main rounded-lg overflow-y-auto p-4'>
				{isAuth ? <LikedTracks /> : null}
			</div>
		</div>
	);
}

export default App;
