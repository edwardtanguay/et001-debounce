import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

const secondsToWait = 2;

interface IBook {
	id: number;
	title: string;
}

function App() {
	const [books, setBooks] = useState<IBook[]>([]);
	const [searchText, setSearchText] = useState('');
	const [timesApiAccessed, setTimesApiAccessed] = useState(0);
	const [initialDataLoaded, setInitialDataLoaded] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	const debounce = (fn: Function, ms = 300) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setIsWaiting(false);
				fn.apply(this, args);
			}, ms);
		};
	};

	const searchApi = () => {
		const url = `https://edwardtanguay.vercel.app/share/techBooks.json`;
		(async () => {
			const data = (await axios.get(url)).data;
			const _originalBooks = data;
			const _books = _originalBooks.filter((m: IBook) =>
				m.title.toLowerCase().includes(searchText.toLowerCase())
			);
			setBooks(_books);
			if (initialDataLoaded) {
				setTimesApiAccessed(timesApiAccessed + 1);
				console.log('here');
			}
		})();
	};

	const debounceSearch = debounce(searchApi, secondsToWait * 1000);

	useEffect(() => {
		if (!initialDataLoaded) {
			searchApi();
		} else {
			if (!isWaiting) {
				setIsWaiting(true);
				debounceSearch();
			}
		}
		setInitialDataLoaded(true);
	}, [searchText]);

	const handleSearchTextChange = (_searchText: string) => {
		setSearchText(_searchText);
	};
	return (
		<div className="App">
			<div className="supertitle">Debounce Example</div>
			<h1>Search Gutenberg Books</h1>
			<div className="searchArea">
				Search:{' '}
				<input
					value={searchText}
					autoFocus
					onChange={(e) => handleSearchTextChange(e.target.value)}
				/>{' '}
				<div className="numberOfSeconds">
					Number of seconds to wait before accessing API:{' '}
					{secondsToWait}
				</div>
				<div className="timesApiAccessed">
					Times API was accessed: {timesApiAccessed}
				</div>
			</div>
			<hr />

			<h2>There are {books.length} books</h2>
			<ul>
				{books.map((book: IBook) => {
					return <li key={book.id}>{book.title}</li>;
				})}
			</ul>
		</div>
	);
}

export default App;
