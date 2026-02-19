//src/components/forms/AuthForm.jsx 

import { useState } from 'react';

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    phoneNumber: '',
};

const AuthForm = ({
    type = "login",
    onSubmit,
    loading = false,
}) => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Frontend validation 
        if (type === 'register' && form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Delegate API Logic to parent (Login/Register page)
        onSubmit(form);
    };
    
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="alert alert-danger">{error}</div>}

            {/* REGISTER */}
            {type === 'register' && (
                <>
                    <input 
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            {/* LOGIN + REGISTER */}
            {(type === 'login' || type === 'register') && (
                <>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            {/* CONFIRM PASSWORD */}
            {type === 'register' && (
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
            )}

            {/* RESET PASSWORD */}
            {type === 'reset' && (
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            )}
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {type === 'login' && 'Login'}
                {type === 'register' && 'Register'}
                {type === 'reset' && 'Reset Password'}
            </button>
        </form>
    );
};  

export default AuthForm;

