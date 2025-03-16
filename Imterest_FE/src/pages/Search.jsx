import { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'; // To access URL query parameters
import apiClient from '../api/apiClient'; // API client setup for making requests
import '../style/gallery.css'; // Import CSS for gallery styles

const Search = () => {
    const [results, setResults] = useState([]); // To store the search results
    const [isSearching, setIsSearching] = useState(false); // To show loading state
    const [error, setError] = useState(null); // To show any error message
    const location = useLocation(); // Get the current location (URL)
    const query = new URLSearchParams(location.search).get('query'); // Extract the search query from URL

    // Fetch search results based on the query parameter from the URL
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                searchImages(query);
            }
        }, 500); // Wait for 500ms before making the API call

        return () => clearTimeout(timeoutId); // Cleanup timeout when query changes
    }, [query]);

    // Fetch search results from API
    const searchImages = async (searchQuery) => {
        setIsSearching(true);
        setError(null); // Clear previous errors

        try {
            const res = await apiClient.get(`/images/search?title=${searchQuery}`);
            console.log(res.data);
            const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
            if (data) {
                setResults(data);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h1 style={{textAlign: 'center'}}>Search Results for "{query}"</h1>

            {/* Show loading indicator */}
            {isSearching && <p style={{textAlign: 'center'}}>Searching...</p>}

            {/* Show error if exists */}
            {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}

            {/* Display results */}
            <div className="gallery-grid">
                {results.length > 0 ? (
                    results.map((img) => (
                        <div key={img.id} className="image-card"> {/* Ensure a unique key */}
                            <Link to={`/image/${img.id}`}>
                                <img src={img.url} alt={img.title}/>
                            </Link>
                            <div className="image-overlay">
                                <h3>{img.title}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    !isSearching && <p style={{textAlign: 'center'}}>No images found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
