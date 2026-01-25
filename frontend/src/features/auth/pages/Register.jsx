//src/features/auth/pages/Register.jsx 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../auth.api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "STAFF",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { name, email, password, role } = formData;

    const handleChange = (e) => {
        setFormData({ 
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            await api.register({ name, email, password, role });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: "400px", margin: "auto" }}>
            <h2 className="auth-title">Register</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        name="role"
                        className="form-select"
                        value={role}
                        onChange={handleChange}
                    >
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;