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
	const [timesSearched, setTimesSearched] = useState(0);

	useEffect(() => {
		const url = `https://edwardtanguay.vercel.app/share/techBooks.json`;
		(async () => {
			setIsLoading(true);
			const data = (await axios.get(url)).data;
			const _originalBooks = data;
			const _books = _originalBooks.filter((m: IBook) =>
				m.title.toLowerCase().includes(searchText.toLowerCase())
			);
			setBooks(_books);
			setIsLoading(false);
			setTimesSearched(timesSearched + 1);
		})();
	}, [searchText]);

	const handleSearchTextChange = (_searchText: string) => {
		setSearchText(_searchText);
	};
	return (
		<div className="App">
			<div className="supertitle">Debouncing Example</div>
			<h1>Search Gutenberg Books</h1>
			<div className="searchArea">
				Search:{' '}
				<input
					value={searchText}
					autoFocus
					onChange={(e) => handleSearchTextChange(e.target.value)}
				/> <span className="timesSearched">times searched: {timesSearched}</span>
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
