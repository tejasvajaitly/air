import { useEffect, useState } from "react";
import sdk from "./spotify";
import { Page, SavedTrack } from "@spotify/web-api-ts-sdk";

const LikedTracks = () => {
	const [tracks, setTracks] = useState<SavedTrack[]>([] as SavedTrack[]);
	const [hasNext, setHasNext] = useState(false);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchTrackPage();
	}, []);

	const fetchTrackPage = async () => {
		setLoading(true);
		const trackPage = await sdk.currentUser.tracks.savedTracks(40, offset);
		console.log(trackPage);
		setTracks(structuredClone(tracks).concat(trackPage.items));
		trackPage.next ? setHasNext(true) : setHasNext(false);
		setOffset(offset + 40);
		setLoading(false);
	};
	return (
		<>
			{tracks.length === 0 && loading ? (
				<div className='w-full h-hull flex justify-center items-center'>
					loading
				</div>
			) : (
				<>
					<div>
						{tracks.map((track) => (
							<div className='flex flex-row justify-start items-center gap-4 my-3'>
								<div className='rounded w-[80px] h-[80px]'>
									<img
										className='rounded'
										src={track.track.album.images[0].url}
									/>
								</div>

								<p className='text-black font-semibold'>{track.track.name}</p>
							</div>
						))}
					</div>
					<div className='flex items-center justify-center'>
						{hasNext ? (
							loading ? (
								<p>loading</p>
							) : (
								<button onClick={fetchTrackPage}>Load More</button>
							)
						) : null}
					</div>
				</>
			)}
		</>
	);
};

export default LikedTracks;
