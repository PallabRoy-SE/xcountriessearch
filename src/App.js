import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import axios from 'axios';

function App() {
    const [countries, setCountries] = useState([]);
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

    useEffect(() => {
        fetchCountries();
    }, []);
    return (
        <section className='main-container'>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                countries.map((country) => (
                    <section className='cards' key={country.name.common}>
                        <Card flag={country.flags.png} name={country.name.common} alt={country.flags.alt} />
                    </section>
                ))
            )}
        </section>
    );
}

export default App;
