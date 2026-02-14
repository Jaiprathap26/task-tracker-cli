📌 Task Tracker CLI

A simple and powerful Command-Line Task Management Application built with Node.js.

This tool allows you to manage your daily tasks directly from the terminal — fast, lightweight, and efficient.

🚀 Features

✅ Add new tasks

✏️ Update existing tasks

🗑️ Delete tasks

🔄 Mark tasks as in-progress

✔️ Mark tasks as done

📋 List all tasks

💾 Automatically creates and manages tasks.json

🛡️ Input validation & error handling

🕒 Tracks:

id

description

status

createdAt

updatedAt

🛠️ Tech Stack

Node.js

File System (fs module)

JSON-based local storage

No external dependencies required.

📦 Installation

Clone the repository:

git clone https://github.com/Jaiprathap26/task-tracker-cli.git


Navigate into the project folder:

cd task-cli


Make sure Node.js is installed:

node -v

▶️ How to Run

Save the file as:

task-cli.js


Then run commands using:

node task-cli.js <command>

📖 Available Commands
➕ Add a Task
node task-cli.js add "Buy groceries"

📋 List All Tasks
node task-cli.js list

✏️ Update a Task
node task-cli.js update 1 "Buy vegetables and fruits"

🔄 Mark Task as In Progress
node task-cli.js mark-in-progress 1

✔️ Mark Task as Done
node task-cli.js mark-done 1

🗑️ Delete a Task
node task-cli.js delete 1

📂 Data Storage

Tasks are stored in a tasks.json file.

The file is automatically created in the directory where the command is executed.

Each task contains:

{
  "id": 1,
  "description": "Buy groceries",
  "status": "done",
  "createdAt": "2026-02-14T10:00:00.000Z",
  "updatedAt": "2026-02-14T10:05:00.000Z"
}

🛡️ Error Handling

Validates missing arguments

Prevents invalid task IDs

Handles file read/write errors

Displays user-friendly error messages

🎯 Why This Project?

This project demonstrates:

CLI application development

File system management

JSON data handling

Clean command parsing

Error handling in Node.js

Perfect for:

Beginners learning Node.js

Backend practice

Portfolio projects

Understanding CLI architecture

📌 Future Improvements (Optional Ideas)

Add filtering (list done / in-progress)

Add search functionality

Add due dates

Convert into global npm package

Add colorized terminal output

Add unit testing

📄 License

MIT License

https://roadmap.sh/projects/task-tracker