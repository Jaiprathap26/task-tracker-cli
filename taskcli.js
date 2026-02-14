#!/usr/bin/env node

/**
 * Task Tracker CLI
 * A command line interface to track and manage tasks.
 * 
 * Usage:
 *   node task-cli.js add "Task description"
 *   node task-cli.js update 1 "New description"
 *   node task-cli.js delete 1
 *   node task-cli.js mark-in-progress 1
 *   node task-cli.js mark-done 1
 *   node task-cli.js list
 *   node task-cli.js list done
 *   node task-cli.js list todo
 *   node task-cli.js list in-progress
 */

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

// Helper: Read tasks from file
function loadTasks() {
    try {
        if (!fs.existsSync(TASKS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error.message);
        return [];
    }
}

// Helper: Write tasks to file
function saveTasks(tasks) {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error saving tasks file:', error.message);
        process.exit(1);
    }
}

// Helper: Get next ID
function getNextId(tasks) {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
}

// Feature: Add a new task
function addTask(description) {
    if (!description) {
        console.error('Error: Task description is required.');
        console.log('Usage: node task-cli.js add "Task description"');
        process.exit(1);
    }

    const tasks = loadTasks();
    const newTask = {
        id: getNextId(tasks),
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Feature: Update a task
function updateTask(idStr, description) {
    const id = parseInt(idStr);
    if (isNaN(id)) {
        console.error('Error: Invalid task ID.');
        process.exit(1);
    }
    if (!description) {
        console.error('Error: New description is required.');
        process.exit(1);
    }

    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.error(`Error: Task with ID ${id} not found.`);
        process.exit(1);
    }

    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log('Task updated successfully.');
}

// Feature: Delete a task
function deleteTask(idStr) {
    const id = parseInt(idStr);
    if (isNaN(id)) {
        console.error('Error: Invalid task ID.');
        process.exit(1);
    }

    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) {
        console.error(`Error: Task with ID ${id} not found.`);
        process.exit(1);
    }

    saveTasks(tasks);
    console.log('Task deleted successfully.');
}

// Feature: Mark task status
function markTask(idStr, status) {
    const id = parseInt(idStr);
    if (isNaN(id)) {
        console.error('Error: Invalid task ID.');
        process.exit(1);
    }

    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.error(`Error: Task with ID ${id} not found.`);
        process.exit(1);
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status}.`);
}

// Feature: List tasks
function listTasks(filterStatus) {
    const tasks = loadTasks();
    
    let filteredTasks = tasks;
    if (filterStatus) {
        const validStatuses = ['todo', 'in-progress', 'done'];
        if (!validStatuses.includes(filterStatus)) {
            console.error(`Error: Invalid status filter. Use: ${validStatuses.join(', ')}`);
            process.exit(1);
        }
        filteredTasks = tasks.filter(t => t.status === filterStatus);
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    console.log('\nTasks:');
    console.log('-----');
    filteredTasks.forEach(task => {
        let statusIcon = '⬜';
        if (task.status === 'in-progress') statusIcon = '🔄';
        if (task.status === 'done') statusIcon = '✅';
        
        console.log(`${statusIcon} [${task.id}] ${task.description}`);
        console.log(`   Status: ${task.status} | Created: ${new Date(task.createdAt).toLocaleDateString()}`);
        console.log('');
    });
}

// Main CLI Logic
function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            addTask(args[1]);
            break;
        
        case 'update':
            updateTask(args[1], args[2]);
            break;
        
        case 'delete':
            deleteTask(args[1]);
            break;
        
        case 'mark-in-progress':
            markTask(args[1], 'in-progress');
            break;
        
        case 'mark-done':
            markTask(args[1], 'done');
            break;
        
        case 'list':
            listTasks(args[1]); // args[1] is optional filter
            break;
        
        case '--help':
        case '-h':
        default:
            console.log(`
Task Tracker CLI - Help
=======================

Commands:
  add ""          Add a new task
  update  ""  Update a task description
  delete                   Delete a task
  mark-in-progress         Mark a task as in progress
  mark-done                Mark a task as done
  list [status]                List all tasks (optional filter: done, todo, in-progress)
  --help, -h                   Show this help message

Examples:
  node task-cli.js add "Buy groceries"
  node task-cli.js list
  node task-cli.js list done
  node task-cli.js mark-done 1
            `);
            break;
    }
}

// Run the application
main();