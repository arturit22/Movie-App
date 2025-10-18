import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

export function useFetchMovies(query: string) {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		const controller = new AbortController();
		const { signal } = controller;
		const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${encodeURIComponent(query)}&type=movie&page=1`;
		if (!query.trim()) { return; }
		const timer = setTimeout(async () => {
			try {
				const res = await fetch(url, {signal})
				const data = await res.json();
				if (data.Response === "False") {
					setMovies([]);
					setError(data.error || "Nothing Found")
				} else {
					const mapped = (data.Search ?? []).map((m: any) => ({
						id: m.imdbID,
						title: m.Title,
						year: Number(m.Year) || 0,
						poster: m.Poster !== "N/A" ? m.Poster : "",
					})) as Movie[];
					setMovies(mapped);
					setError("");
				}
			} catch (e: any) {
				if (e.name === "AbortError") return;
				setError("Network Error");
				setMovies([]);
			} finally {setLoading(false)}
			
		}, 500)
		return () => {
			clearTimeout(timer);
			controller.abort();
		}
	}, [query]);
	
	return { movies, loading, error };
}
