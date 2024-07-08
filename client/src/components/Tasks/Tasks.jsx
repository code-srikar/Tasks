import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Tasks.css';
import logo from '../../assets/logo.jpeg';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ taskName: '', desc: '' });

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user) {
            navigate('/login');
        }
        fetchTasks();
    }, [auth.user, navigate]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks?userId=${auth.user._id}`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
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
                setShowAddForm(false);
                fetchTasks();
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleMarkComplete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Completed' }),
            });
            if (response.ok) {
                fetchTasks();
            } else {
                console.error('Failed to mark task as complete');
            }
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTasks();
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (!auth.user) {
        return null;
    }

    return (
        <div className="tasks-page">
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
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
                        <Nav className="ms-auto">
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Nav.Link className="logout-link" onClick={() => auth.logout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="tasks-container">
                <Row className="justify-content-md-center mb-4">
                    <Col md={10}>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-center text-white">Your Tasks</h1>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    {tasks.map((task) => (
                        <Col key={task._id} md={6} className="mb-4">
                            <Card className="task-card">
                                <Card.Body>
                                    <Card.Title className="text-white">{task.taskName}</Card.Title>
                                    <Card.Text className="text-white">{task.desc}</Card.Text>
                                    <Card.Text className="text-white">Status: {task.status}</Card.Text>
                                    <Card.Text className="text-white">Date: {new Date(task.date).toLocaleDateString()}</Card.Text>
                                    <Button variant="success" className="glow-on-hover mr-2" onClick={() => handleMarkComplete(task._id)}>Mark as Complete</Button>
                                    <Button variant="danger" className="glow-on-hover" onClick={() => handleDeleteTask(task._id)}>Delete Task</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        {!showAddForm ? (
                            <Button variant="primary" className="glow-on-hover" onClick={() => setShowAddForm(true)}>Add New Task</Button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="add-task-form"
                            >
                                <Form onSubmit={handleAddTask}>
                                    <Form.Group controlId="formTaskName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter task name"
                                            value={formData.taskName}
                                            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDesc">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter task description"
                                            value={formData.desc}
                                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Add Task</Button>
                                    <Button variant="secondary" className="ms-2" onClick={() => setShowAddForm(false)}>Cancel</Button>
                                </Form>
                            </motion.div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Tasks;
