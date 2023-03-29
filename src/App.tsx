import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

interface IBook {
	id: number;
	title: string;
}

function App() {
	const [books, setBooks] = useState<IBook[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchText, setSearchText] = useState('');

	const searchBooksApi = (_searchText: string) => {
		const url = `https://gutendex.com/books/?search=${_searchText}`;
		(async () => {
			setIsLoading(true);
			const data = (await axios.get(url)).data;
			const _books = data.results;
			setBooks(_books);
			setIsLoading(false);
		})();
	};

	const handleSearchTextChange = (_searchText: string) => {
		setSearchText(_searchText);
		searchBooksApi(_searchText);
	};
	return (
		<div className="App">
			<div className="supertitle">Debouncing Example</div>
			<h1>Search Gutenberg Books</h1>
			<div className="searchArea">
				Search:{' '}
				<input
					autoFocus
					onChange={(e) => handleSearchTextChange(e.target.value)}
				/>
			</div>
			<hr />

			{isLoading ? (
				<p>loading...</p>
			) : (
				<>
					<h2>There are {books.length} books</h2>
					<ul>
						{books.map((book: IBook) => {
							return <li>{book.title}</li>;
						})}
					</ul>
				</>
			)}
		</div>
	);
}

export default App;
