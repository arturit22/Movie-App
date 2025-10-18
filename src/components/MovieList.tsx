import { MovieCard } from "./MovieCard";
import type { Movie } from "../types/Movie";

type MovieListProps = {
	movies: Movie[];
	favorites: Movie[];
	onAdd: (movie: Movie) => void;
	onRemove: (id: string) => void;
};

export function MovieList({
	movies,
	favorites,
	onAdd,
	onRemove,
}: MovieListProps): JSX.Element {
	return (
		<ul className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border rounded-lg shadow p-3 bg-white hover:shadow-lg transition items-stretch">
			{movies.map((movie) => {
				const isFav = favorites.some((f) => f.id === movie.id);
				return (
					<li key={movie.id}>
						<MovieCard
							movie={movie}
							isFavorite={isFav}
							onAdd={onAdd}
							onRemove={onRemove}
						/>
					</li>
				);
			})}
		</ul>
	);
}
