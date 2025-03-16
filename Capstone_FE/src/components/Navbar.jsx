import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import '../style/navbar.css';
import apiClient from '../api/apiClient'; // Import API client

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown starts closed
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]); // Store suggestions
    const [isSearching, setIsSearching] = useState(false); // To show loading state
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Fetch search suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim() === '') {
                setSuggestions([]); // Clear suggestions if search is empty
                return;
            }

            setIsSearching(true);
            try {
                const res = await apiClient.get(`/images/search?title=${searchTerm}`);
                const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
                setSuggestions(data || []);
            } catch (error) {
                console.error('Error fetching search suggestions:', error);
            } finally {
                setIsSearching(false);
            }
        };

        const debounceTimeout = setTimeout(fetchSuggestions, 500);

        return () => clearTimeout(debounceTimeout); // Clean up timeout
    }, [searchTerm]);

    // Handle search when pressing Enter
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?query=${searchTerm}`);
            setSearchTerm(''); // Clear the input after search
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title);
        setSuggestions([]);
        navigate(`/search?query=${suggestion.title}`);
        setSearchTerm('');
    };

    // Handle Create Image button click
    const handleCreateImageClick = () => {
        if (!user) {
            // If user is not logged in, redirect to login page
            navigate('/login');
        } else {
            // If user is logged in, navigate to the create image page
            navigate('/create-image');
        }
    };

    // Close dropdown if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false); // Close dropdown when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle the dropdown on avatar click
    const handleDropdownToggle = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown state when clicked
    };

    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                {/* Left Section */}
                <div className="navbar-left">
                    {/* Replacing the Home button with an image */}
                    <Link to="/" className="home-btn">
                        <img src="/logo.svg" alt="Home" className="logo-image"/>
                    </Link>
                    <button className="create-btn" onClick={handleCreateImageClick}>
                        Create Image
                    </button>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                    <FaSearch className="search-icon"/>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />

                    {/* Suggestions List */}
                    {suggestions.length > 0 && (
                        <div className="suggestion-list">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index} // Ensure a unique key
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)} // Handle suggestion click
                                >
                                    {suggestion.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="navbar-right">
                    {user ? (
                        <div className="dropdown" ref={dropdownRef}>
                            <button className="avatar" onClick={handleDropdownToggle}>
                                {user.name.charAt(0).toUpperCase()}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu right">
                                    <Link to="/profile">Profile</Link>
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="login-register-links">
                            <Link to="/login" className="login-btn">Login</Link>
                            <Link to="/register" className="register-btn">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
