// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "todo-notes" is now active!');

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('todoNotes', {
            resolveWebviewView(webviewView) {
                console.log('Webview view is being resolved');
                webviewView.webview.options = {
                    enableScripts: true,
                };

                webviewView.webview.html = getWebviewContent();
            }
        })
    );
}


function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TODO Notes v0.1</title>
        <style>
            body { font-family: Arial, sans-serif; }
            ul { list-style-type: none; padding: 0; }
            li { margin: 5px 0; }
            .nested { margin-left: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; }
            .button-container { display: flex; align-items: center; justify-content: flex-end; }
            button { margin-left: 5px; }
        </style>
    </head>
    <body>
        <h1>TODO Notes</h1>
        
        <div class="header">
            <h2>TODO</h2>
            <button id="addTodoButton">+</button>
        </div>
        <ul id="todoList"></ul>

        <div class="header">
            <h2>Notes</h2>
            <button id="addNoteButton">+</button>
        </div>
        <ul id="notesList"></ul>

        <script>
            // JavaScript functions for handling tasks
            document.getElementById('addTodoButton').onclick = () => {
                const todoList = document.getElementById('todoList');
                const li = document.createElement('li');
                li.innerHTML = '<input type="checkbox" onchange="toggleCheckbox(this)"> ' +
                               '<span contenteditable="true" onblur="updateTask(this)" placeholder="New TODO..."></span>' +
                               '<div class="button-container">' +
                               '<button onclick="addSubtask(this)">+</button>' +
                               '<button onclick="deleteTask(this)">-</button>' +
                               '</div>' +
                               '<ul class="nested"></ul>';
                todoList.appendChild(li);
                
                // Set focus to the new TODO item
                const span = li.querySelector('span');
                span.focus();
            };

            function toggleCheckbox(checkbox) {
                const listItem = checkbox.parentElement;
                const nestedItems = listItem.querySelectorAll('.nested input[type="checkbox"]');
                nestedItems.forEach(childCheckbox => {
                    childCheckbox.checked = checkbox.checked;
                });
            }

            function updateTask(span) {
                // Update task logic can be added here if needed
            }

            function deleteTask(button) {
                const listItem = button.parentElement.parentElement;
                listItem.remove();
            }

            function addSubtask(button) {
                const subtaskLi = document.createElement('li');
                subtaskLi.innerHTML = '<input type="checkbox" onchange="toggleCheckbox(this)"> ' +
                                      '<span contenteditable="true" onblur="updateTask(this)" placeholder="New Subtask..."></span>' +
                                      '<button onclick="deleteSubtask(this)">-</button>';
                button.parentElement.parentElement.querySelector('.nested').appendChild(subtaskLi);
                
                // Set focus to the new subtask item
                const span = subtaskLi.querySelector('span');
                span.focus();
            }

            function deleteSubtask(button) {
                const subtaskItem = button.parentElement.parentElement; // Correctly navigate to the subtask item
                subtaskItem.remove();
            }

            // JavaScript functions for handling notes
            document.getElementById('addNoteButton').onclick = () => {
                const notesList = document.getElementById('notesList');
                const noteLi = document.createElement('li');
                noteLi.innerHTML = '<span contenteditable="true" onblur="updateNote(this)" placeholder="New Note..."></span>' +
                                   '<button onclick="deleteNote(this)">-</button>';
                notesList.appendChild(noteLi);
                
                // Set focus to the new note item
                const span = noteLi.querySelector('span');
                span.focus();
            };

            function updateNote(span) {
                // Update note logic can be added here if needed
            }

            function deleteNote(button) {
                const noteItem = button.parentElement;
                noteItem.remove();
            }
        </script>
    </body>
    </html>`;
}


export function deactivate() {}