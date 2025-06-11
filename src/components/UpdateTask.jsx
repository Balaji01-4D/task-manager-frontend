import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { BsSave2, BsArrowLeft, BsTrash } from 'react-icons/bs';
import { AppContext } from '../Context/Context';

const UpdateTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { tasks, updateTask, deleteTask } = useContext(AppContext);
    const [task, setTask] = useState(null);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const currentTask = tasks.find(t => t.id === parseInt(id));
        if (currentTask) {
            setTask(currentTask);
        }
        setLoading(false);
    }, [id, tasks]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            setIsSubmitting(true);
            await updateTask(id, task);
            navigate('/');
        } catch (error) {
            console.error('Error updating task:', error);
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                setIsSubmitting(true);
                await deleteTask(id);
                navigate('/');
            } catch (error) {
                console.error('Error deleting task:', error);
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: type === 'checkbox' ? checked :
                    type === 'number' ? parseInt(value) : value
        }));
    };

    if (loading) {
        return (
            <Container className="mt-4">
                <div className="loading-spinner">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </Container>
        );
    }

    if (!task) {
        return (
            <Container className="mt-4">
                <div className="empty-state">
                    <h5>Task Not Found</h5>
                    <p>The task you're looking for doesn't exist.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Return to Tasks
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-4 fade-in">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="d-flex align-items-center mb-4">
                        <Button
                            variant="link"
                            className="p-0 me-3 text-decoration-none"
                            onClick={() => navigate('/')}
                        >
                            <BsArrowLeft size={20} />
                        </Button>
                        <h2 className="mb-0">Update Task</h2>
                    </div>

                    <Card>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                        placeholder="Enter task title"
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a task title.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                        placeholder="Enter task description"
                                        disabled={isSubmitting}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Priority Level (1-10)</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="priorityLevel"
                                        value={task.priorityLevel}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        disabled={isSubmitting}
                                    />
                                    <Form.Text className="text-muted">
                                        1 = Low priority, 10 = High priority
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a priority level between 1 and 10.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        label="Mark as completed"
                                        name="completed"
                                        checked={task.completed}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <BsSave2 size={20} />
                                        {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={handleDelete}
                                        disabled={isSubmitting}
                                        className="d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <BsTrash size={20} />
                                        Delete Task
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => navigate('/')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateTask;
