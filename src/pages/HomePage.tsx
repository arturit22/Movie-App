import { useState, useReducer, useEffect } from "react";
import type { FavoritesState } from "../reducers/favorite";
import { favoritesReducer } from "../reducers/favorite";
import { SearchBar } from "../components/SearchBar";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { MovieList } from "../components/MovieList";
import { Heart } from "lucide-react";
import { FavoritesPanel } from "../components/FavoritesPanel";



export function HomePage() {
    const [query, setQuery] = useState<string>("");
	const [isFavOpen, setFavOpen] = useState(false);

	const initialFavorites: FavoritesState = { items: [] };
	const [favorites, dispatch] = useReducer(
		favoritesReducer,
		{ items: [] },
		(initial) => {
			const stored = localStorage.getItem("favorites");
			return stored ? { items: JSON.parse(stored) } : initial;
		}
	);
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites.items));
	}, [favorites.items]);

	const { movies, loading, error } = useFetchMovies(query);

    return (
        <div>
            <div className="flex items-center justify-between p-4">
					<h1 className="text-2xl font-bold p-4">Movie Base</h1>
					<div className="relative">
						<Heart
							className="w-7 h-7 text-red-500"
							strokeWidth={2}
							fill={favorites.items.length > 0 ? "currentColor" : "none"}
							onClick={() => setFavOpen((v) => !v)}
						/>
						{favorites.items.length > 0 && (
							<span
								className="absolute -top-2 -right-2 min-w-5 h-5 px-1
                   rounded-full bg-red-500 text-white text-xs font-bold
                   flex items-center justify-center">
								{favorites.items.length}
							</span>
						)}
						{isFavOpen && (
							<FavoritesPanel
								items={favorites.items}
								onRemove={(id) => dispatch({ type: "remove", payload: id })}
							/>
						)}
					</div>
				</div>

				<SearchBar value={query} onChange={setQuery} />
				{loading && <p>Loading...</p>}
				{error && <p className="text-red-600">{error}</p>}

				<MovieList
					movies={movies}
					favorites={favorites.items}
					onAdd={(movie) => dispatch({ type: "add", payload: movie })}
					onRemove={(id) => dispatch({ type: "remove", payload: id })}
				/>
        </div>
    )
}