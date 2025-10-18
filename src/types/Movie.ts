export type Movie = {
    id: string;
    title: string;
    year: number;
    poster: string;
};

const movies: Movie[] = (data.Search ?? []).map((m: any) => ({
    id: m.imdbID,
    title: m.Title,
    year: Number(m.Year),
    poster: m.Poster !== "N/A" ? m.Poster : "",
}));