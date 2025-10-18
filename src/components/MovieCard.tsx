import type { Movie } from "../types/Movie";
import { Link } from "react-router-dom";
type MovieCardProps = {
	movie: Movie;
	onAdd: (movie: Movie) => void;
	onRemove: (id: string) => void;
	isFavorite: boolean;
};

export function MovieCard({
	movie,
	onAdd,
	onRemove,
	isFavorite,
}: MovieCardProps): JSX.Element {
	return (
		<div className="flex flex-col border rounded-lg shadow bg-white p-2 w-full h-full">
      <Link to={`/movie/${movie.id}`} className="block hover:opacity-80 transition">
			<div className="w-full h-full overflow-hidden rounded">
				{movie.poster ? <img
					className="w-full h-full object-cover"
					src={movie.poster}
					alt={movie.title}
				/> : <h2>No Film</h2>}
				
			</div>
      </Link>

			<h3 className="mt-2 font-semibold text-sm line-clamp-2">{movie.title}</h3>
			<button onClick={() => (isFavorite ? onRemove(movie.id) : onAdd(movie))}>
				{isFavorite ? "Remove from favorites" : "To favorite"}
			</button>
			<p className="text-gray-600 text-xs">{movie.year}</p>
		</div>
	);
}
