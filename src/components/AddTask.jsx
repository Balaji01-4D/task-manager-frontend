import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../models/Task';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { BsCheck2Circle, BsArrowLeft } from 'react-icons/bs';
import { AppContext } from '../Context/Context';

const AddTask = () => {
    const navigate = useNavigate();
    const { addTask } = useContext(AppContext);
    const [task, setTask] = useState(new Task());
    const [validated, setValidated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await addTask(task);
            navigate('/');
        } catch (error) {
            console.error('Error creating task:', error);
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: type === 'number' ? parseInt(value) : value
        }));
    };

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
                        <h2 className="mb-0">Add New Task</h2>
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

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <BsCheck2Circle size={20} />
                                        {isSubmitting ? 'Creating Task...' : 'Create Task'}
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

export default AddTask;
