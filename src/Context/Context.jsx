import React, { createContext, useState, useEffect } from 'react';
import { TaskService } from '../services/TaskService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await TaskService.getAllTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Error fetching tasks: ' + err.message);
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        try {
            const newTask = await TaskService.createTask(task);
            setTasks(prevTasks => [...prevTasks, newTask]);
            return newTask;
        } catch (err) {
            setError('Error adding task: ' + err.message);
            throw err;
        }
    };

    const updateTask = async (id, task) => {
        try {
            const updatedTask = await TaskService.updateTask(id, task);
            setTasks(prevTasks =>
                prevTasks.map(t => t.id === id ? updatedTask : t)
            );
            return updatedTask;
        } catch (err) {
            setError('Error updating task: ' + err.message);
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            await TaskService.deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
        } catch (err) {
            setError('Error deleting task: ' + err.message);
            throw err;
        }
    };

    const searchTasks = async (query) => {
        try {
            setLoading(true);
            const results = await TaskService.searchTasks(query);
            setTasks(results);
            setError(null);
        } catch (err) {
            setError('Error searching tasks: ' + err.message);
            console.error('Error searching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterTasksByPriority = async (priority) => {
        try {
            setLoading(true);
            const results = await TaskService.getTasksByPriority(priority);
            setTasks(results);
            setError(null);
        } catch (err) {
            setError('Error filtering tasks: ' + err.message);
            console.error('Error filtering tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <AppContext.Provider value={{
            tasks,
            loading,
            error,
            fetchTasks,
            addTask,
            updateTask,
            deleteTask,
            searchTasks,
            filterTasksByPriority
        }}>
            {children}
        </AppContext.Provider>
    );
};
