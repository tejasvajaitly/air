import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const sdk = SpotifyApi.withUserAuthorization(
	"fd002d4ff8914498a569aaff74fd0668",
	"http://localhost:5173",
	["user-library-read"]
);

export default sdk;
