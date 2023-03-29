import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const url = 'https://gutendex.com/books/?search=berlin';

function App() {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const data = (await axios.get(url)).data;
			const _books = data.results;
			setBooks(_books);
			setIsLoading(false);
		})();
	}, []);

	return (
		<div className="App">
			<div className="supertitle">Debouncing Example</div>
			<h1>Search Gutenberg Books</h1>
			<div className="searchArea">
				Search: <input />
			</div>
			<hr />

			{isLoading ? (
				<p>loading...</p>
			) : (
				<h2>There are {books.length} books</h2>
			)}
		</div>
	);
}

export default App;
