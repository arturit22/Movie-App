import { Movie } from "../types/Movie";

export type FavoritesState = { items: Movie[] };

export type FavoritesAction =
	| { type: "add"; payload: Movie }
	| { type: "remove"; payload: string };

export function favoritesReducer(
	state: FavoritesState,
	action: FavoritesAction
): FavoritesState {
	switch (action.type) {
		case "add":
			if (state.items.some((m) => m.id === action.payload.id)) {
				return state;
			}
			return { items: [...state.items, action.payload] };
		case "remove":
			return { items: state.items.filter((m) => m.id !== action.payload) };
		default:
			return state;
	}
}
