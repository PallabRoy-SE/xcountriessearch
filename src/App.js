import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import axios from 'axios';

function App() {
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(() => [...response.data]);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchText) => {
        setFilteredCountries(() =>
            searchText
                ? countries.filter((country) =>
                      country.name.common.trim().toLowerCase().includes(searchText.trim().toLowerCase())
                  )
                : [...countries]
        );
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, countries]);
    return (
        <>
            <nav>
                <input
                    type='text'
                    placeholder='Search for countries...'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </nav>
            <section className='main-container'>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    filteredCountries.map((country) => (
                        <section className='cards' key={country.name.common}>
                            <Card flag={country.flags.png} name={country.name.common} alt={country.flags.alt} />
                        </section>
                    ))
                )}
            </section>
        </>
    );
}

export default App;
