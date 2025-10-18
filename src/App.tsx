import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";



function App() {


	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				
			</Routes>
		</>
	);
}

export default App;
