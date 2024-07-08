import React, { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
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
        setError('');

        // Basic validation for password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please try again.');
            setLoading(false);
            return;
        }

        // Simulated signup action
        try {
            const user = await auth.signupAction(formData);
            // console.log(user)

            // Example success handling
            if (user.success) {
                alert('Created Successfully')
                navigate('/login')
            } else {
                setError('Signup failed. Email might already exists.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`signup-page ${loading ? 'loading' : ''}`}>
            <Container className="signup-container">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Form onSubmit={handleSubmit} className="signup-form">
                                <h2>Sign Up</h2>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

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

                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="glow-on-hover"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing up...' : 'Sign Up'}
                                </motion.button>

                                {error && <p className="text-danger mt-3">{error}</p>}

                                <p className="login-link">
                                    Already have an account? <Link to="/login">Log in</Link>
                                </p>
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

export default Signup;
