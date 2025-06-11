import axios from '../axios';
import { Task } from '../models/Task';

export class TaskService {
    static async getAllTasks() {
        const response = await axios.get('/tasks');
        return response.data.map(task => Task.fromJson(task));
    }

    static async getTaskById(id) {
        const response = await axios.get(`/tasks/${id}`);
        return Task.fromJson(response.data);
    }

    static async createTask(task) {
        const response = await axios.post('/tasks', task);
        return Task.fromJson(response.data);
    }

    static async updateTask(id, task) {
        const response = await axios.put(`/tasks/${id}`, task);
        return Task.fromJson(response.data);
    }

    static async deleteTask(id) {
        await axios.delete(`/tasks/${id}`);
    }

    static async searchTasks(query) {
        const response = await axios.get(`/tasks/search?query=${encodeURIComponent(query)}`);
        return response.data.map(task => Task.fromJson(task));
    }

    static async getTasksByPriority(priority) {
        const response = await axios.get(`/tasks/priority/${priority}`);
        return response.data.map(task => Task.fromJson(task));
    }
}
