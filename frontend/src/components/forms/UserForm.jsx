//src/components/UserForm.jsx

/* 
** username
** password 
** role(Admin / Manager / Staff) 
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Staff');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        const newUser = {
            id: Date.now(),
            username,
            password,
            role
        };

        dispatch(addUser(newUser));
        toast.success('User added successfully');
        navigate('/users');
    };

    return (
        <div className="user-form-container">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Add User</button>
            </form>
        </div>
    );
};

export default UserForm;

