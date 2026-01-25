//src/features/auth/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ 
            ...formData,
            [e.target.name]: e.target.value,
         });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            
            const { data } = await api.post("/auth/login", { 
                email,
                password,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("name", data.user.name);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "An error occurred during login."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Login</h2>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
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

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}
                    >
                {loading ? "Logging in..." : "Login"}
            </button>
            </form>
        </div>
    );
};
export default Login;


