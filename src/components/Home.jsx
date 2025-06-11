import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { BsPencil, BsTrash, BsSearch, BsFilter, BsCalendar4, BsCheckCircle, BsPlus, BsXCircle } from 'react-icons/bs';
import { AppContext } from '../Context/Context';

const Home = () => {
    const navigate = useNavigate();
    const {
        tasks,
        loading,
        error,
        fetchTasks,
        deleteTask,
        updateTask,
        searchTasks,
        filterTasksByPriority
    } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchTasks();
            setIsFiltered(false);
            return;
        }
        await searchTasks(searchQuery);
        setIsFiltered(true);
    };

    const handlePriorityFilter = async () => {
        if (!priorityFilter) {
            fetchTasks();
            setIsFiltered(false);
            return;
        }
        await filterTasksByPriority(parseInt(priorityFilter));
        setIsFiltered(true);
    };

    const handleClearFilters = async () => {
        setSearchQuery('');
        setPriorityFilter('');
        setIsFiltered(false);
        await fetchTasks();
    };

    const handleToggleComplete = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const getPriorityColor = (level) => {
        if (level >= 8) return 'danger';
        if (level >= 5) return 'warning';
        return 'info';
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

    if (error) {
        return (
            <Container className="mt-4">
                <div className="empty-state text-danger">
                    <h5>Error</h5>
                    <p>{error}</p>
                    <Button variant="outline-primary" onClick={fetchTasks}>
                        Try Again
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <>
            <Container className="mt-4 fade-in">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="mb-0">My Tasks</h2>
                        <p className="text-muted mb-0">
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                        </p>
                    </Col>
                </Row>

                <Card className="mb-4 search-filter-card">
                    <Card.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Search Tasks</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search by title or description..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <Button variant="outline-primary" onClick={handleSearch}>
                                            <BsSearch />
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Filter by Priority</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            type="number"
                                            placeholder="Priority level (1-10)"
                                            value={priorityFilter}
                                            onChange={(e) => setPriorityFilter(e.target.value)}
                                            min="1"
                                            max="10"
                                            onKeyPress={(e) => e.key === 'Enter' && handlePriorityFilter()}
                                        />
                                        <Button variant="outline-primary" onClick={handlePriorityFilter}>
                                            <BsFilter />
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                            {isFiltered && (
                                <Col xs={12}>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleClearFilters}
                                            className="clear-filters-button"
                                        >
                                            <BsXCircle className="me-2" />
                                            Clear Filters
                                        </Button>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Card.Body>
                </Card>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <BsCheckCircle size={48} className="text-muted mb-3" />
                        <h5>No Tasks Found</h5>
                        <p>Start by adding a new task or try a different search.</p>
                        <Button variant="primary" onClick={() => navigate('/add-task')}>
                            Add Your First Task
                        </Button>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {tasks.map(task => (
                            <Col key={task.id}>
                                <Card className="h-100">
                                    <Card.Body className="d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                className="task-checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleComplete(task)}
                                                label={
                                                    <span className="task-title" style={{
                                                        textDecoration: task.completed ? 'line-through' : 'none',
                                                        color: task.completed ? 'var(--text-secondary)' : 'inherit'
                                                    }}>
                                                        {task.title}
                                                    </span>
                                                }
                                            />
                                            <Badge bg={getPriorityColor(task.priorityLevel)}>
                                                Priority {task.priorityLevel}
                                            </Badge>
                                        </div>

                                        <Card.Text className="task-description flex-grow-1">
                                            {task.description}
                                        </Card.Text>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className="task-meta">
                                                <BsCalendar4 size={14} />
                                                {new Date(task.createdDate).toLocaleDateString()}
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => navigate(`/update-task/${task.id}`)}
                                                    title="Edit Task"
                                                >
                                                    <BsPencil />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(task.id)}
                                                    title="Delete Task"
                                                >
                                                    <BsTrash />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            <button
                className="floating-action-button"
                onClick={() => navigate('/add-task')}
                title="Add New Task"
            >
                <BsPlus size={24} />
            </button>
        </>
    );
};

export default Home;
