import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.jpeg';

const Home = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ taskName: '', desc: '' });

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    const handleViewTasks = () => {
        navigate('/tasks');
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId: auth.user._id }),
            });
            if (response.ok) {
                setFormData({ taskName: '', desc: '' });
                // Optionally, you can navigate to tasks page after adding task
                navigate('/tasks');
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="home-page">
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
                <Container fluid>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Navbar.Brand className="navbar-brand">
                            <img
                                src={logo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="Taskify logo"
                            />
                            {' '} Taskify
                        </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Nav.Link className="logout-link" onClick={() => handleLogout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="home-container">
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-center text-white mb-4">Welcome to Taskify, {auth.user.name}</h1>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} className="mb-4">
                        <Card className="task-card">
                            <Card.Body>
                                <Card.Title className="text-white">Your Tasks</Card.Title>
                                <Card.Text className="text-white">
                                    View and manage your tasks efficiently.
                                </Card.Text>
                                <Button variant="primary" className="glow-on-hover" onClick={handleViewTasks}>View Tasks</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} sm={12} className="mb-4">
                        <Card className="task-card">
                            <Card.Body>
                                <Card.Title className="text-white">Add New Task</Card.Title>
                                <Form onSubmit={handleAddTask}>
                                    <Form.Group controlId="taskName">
                                        {/* <Form.Label>Task Name</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter task name"
                                            value={formData.taskName}
                                            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="taskDescription">
                                        {/* <Form.Label>Task Description</Form.Label> */}
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter task description"
                                            value={formData.desc}
                                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="glow-on-hover">Add Task</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
