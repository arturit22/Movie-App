import type { Movie } from "../types/Movie"

type FavoritesPanelProps = {
    items: Movie[];
    onRemove: (id:string) => void;
};



export function FavoritesPanel({items, onRemove}: FavoritesPanelProps) {
    const hasValidItems = items.some(movie => 
        movie.title &&
        movie.title.trim() != '' &&
        movie.id &&
        movie.id.trim() != ''
    );
    return (
        <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white border  shadow">
            {!hasValidItems ? (
                <div className="p-3 text-sm text-gray-500">Empty</div>
            ) : (
                <ul className="p-2 space-y-2">
                    {items.map(m => (
                        <li key={m.id} className="flex items-center gap-2">
                            <img src={m.poster} alt={m.title} className="w-10 h-14 object-cover rounded" />
                            <div className="min-w-0">
                                <div className="text-sm font-medium truncate">{m.title}</div>
                                <div className="text-xs text-gray-500">{m.year}</div>
                            </div>
                            <button
                                onClick={() => onRemove(m.id)}
                                className="ml-auto text-xs px-2 py-1 rounded bg-red-500 text-white"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}