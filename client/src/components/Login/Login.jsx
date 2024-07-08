import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous error
        const user = await auth.loginAction(formData);
        setLoading(false);
        if (user) {
            navigate('/home');
        } else {
            setError('Invalid login credentials. Please try again.');
        }
    };

    return (
        <div className={`login-page ${loading ? 'loading' : ''}`}>
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Form onSubmit={handleSubmit} className="login-form">
                                <h2>Login</h2>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Link to="/login" className="text-secondary">Forgot Password?</Link>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="glow-on-hover"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </motion.button>
                                {error && <p className="text-danger mt-3">{error}</p>}

                                <div className="mt-4 text-center">
                                    <span className="text-secondary">Don't have an account? </span>
                                    <Link to="/signup" className="text-primary">Create one here</Link>
                                </div>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default Login;
