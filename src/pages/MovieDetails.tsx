import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type MovieDetailsData = {
	id: string;
	title: string;
	year: number;
	poster: string;
	plot: string;
	genre: string;
	runtime: string;
	rating: string;
	director: string;
	actors: string;
};
export function MovieDetails() {
	const [details, setDetails] = useState<MovieDetailsData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { id } = useParams<{ id: string }>();
	if (!id) return <div className="p-4">Нет id в адресе</div>;

	useEffect(() => {
		let cancelled = false;
		const API_KEY = import.meta.env.VITE_OMDB_KEY;
		const controller = new AbortController();

		async function load() {
			try {
				setLoading(true);
				setError("");
				setDetails(null);

				const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full&_=${Date.now()}`;
				const res = await fetch(url, {
					signal: controller.signal,
					cache: "no-store",
				});
				const data = await res.json();

				if (data.Response === "False") {
					if (!cancelled) {
						setError(data.Error || "Not Found");
						setDetails(null);
					}
					return;
				}
				const mapped: MovieDetailsData = {
					id: data.imdbID,
					title: data.Title,
					year: Number(data.Year) || 0,
					poster: data.Poster !== "N/A" ? data.Poster : "",
					plot: data.Plot ?? "",
					genre: data.Genre ?? "",
					runtime: data.Runtime ?? "",
					rating: data.imdbRating ?? "",
					director: data.Director ?? "",
					actors: data.Actors ?? "",
				};

				if (!cancelled) setDetails(mapped);
			} catch (e: any) {
				if (e.name === "AbortError") return;
				if (!cancelled) {
					setError("Network error");
					setDetails(null);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [id]);

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div className="text-red-600">{error}</div>;
	if (!details) return <div>Нет данных</div>;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
			<div className="p-4 max-w-3xl mx-auto flex justify-center gap-4">
				<div className="w-1/3 h-80 rounded">
					<img
						src={details.poster}
						alt={details.title}
						className="w-full h-full object-contain"
					/>
				</div>
				<div className="p-12 w-2/3 ">
					<h1><strong>Title: </strong>{details.title}</h1>
					<h3><strong>Year: </strong>{details.year}</h3>
					<h3><strong>Rating: </strong>{details.rating}</h3>
                    <h3><strong>Genre: </strong>{details.genre}</h3>
                    <h3><strong>Duration: </strong>{details.runtime}</h3>
				</div>
			</div>
            <div className="flex justify-center mt-24">
                <h2>Description</h2>
            </div>
            <div className="flex justify-center mt-12">
                <p className=" text-center max-w-xl">{details.plot}</p>
            </div>
		</div>
	);
}
