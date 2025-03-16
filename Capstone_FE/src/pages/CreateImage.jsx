import { useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/gallery.css';

const PostImage = () => {
    const { user } = useContext(AuthContext); // Lấy thông tin user từ context
    const navigate = useNavigate(); // Điều hướng
    const [form, setForm] = useState({
        title: '',
        url: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: form.title,
                url: form.url,
                creatorId: user.userId
            };
            await apiClient.post('/images', payload);
            alert('Image uploaded successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Upload New Image</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Image Title"
                    required
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <input
                    type="url"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="button">Upload Image</button>
            </form>
        </div>
    );
};

export default PostImage;
