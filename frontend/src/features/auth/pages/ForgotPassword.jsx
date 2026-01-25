//src/features/pages/ForgotPassword.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../auth.api"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true); 
            await api.post("/auth/forgot-password", { email });

            setMessage("If an account with that email exists, a password reset link has been sent.");
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2 className="forgot-password-title">Forgot Password</h2>

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

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}
export default ForgotPassword;
