// ===========================================
// FORM VALIDATION FUNCTIONALITY
// ===========================================

// Custom form validation - handles all validation logic without relying on HTML5 validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name field
    const name = document.getElementById('name').value.trim();
    const nameField = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (name.length < 2) {
        showError(nameField, nameError);
        isValid = false;
    } else {
        hideError(nameField, nameError);
    }
    
    // Validate email field with custom regex
    const email = document.getElementById('email').value.trim();
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(emailField, emailError);
        isValid = false;
    } else {
        hideError(emailField, emailError);
    }
    
    // Validate phone number (optional but must be valid if provided)
    const phone = document.getElementById('phone').value.trim();
    const phoneField = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\d{10}$/;
    
    if (phone && !phoneRegex.test(phone.replace(/\D/g, ''))) {
        showError(phoneField, phoneError);
        isValid = false;
    } else {
        hideError(phoneField, phoneError);
    }
    
    // Validate subject selection
    const subject = document.getElementById('subject').value;
    const subjectField = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');
    
    if (!subject) {
        showError(subjectField, subjectError);
        isValid = false;
    } else {
        hideError(subjectField, subjectError);
    }
    
    // Validate message length
    const message = document.getElementById('message').value.trim();
    const messageField = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    
    if (message.length < 10) {
        showError(messageField, messageError);
        isValid = false;
    } else {
        hideError(messageField, messageError);
    }
    
    // If all validation passes, show success message
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
});

// Helper functions for form validation display
function showError(field, errorElement) {
    field.classList.add('error');
    errorElement.style.display = 'block';
}

function hideError(field, errorElement) {
    field.classList.remove('error');
    errorElement.style.display = 'none';
}

// ===========================================
// CALCULATOR FUNCTIONALITY
// ===========================================

let currentInput = '0';
let shouldResetDisplay = false;

// Updates the calculator display
function updateDisplay() {
    document.getElementById('calcDisplay').textContent = currentInput;
}

// Appends numbers or operators to the current calculation
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

// Clears the entire calculator display
function clearCalculator() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

// Deletes the last entered character
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Calculates and displays the result
function calculateResult() {
    try {
        // Replace × with * for evaluation
        let expression = currentInput.replace(/×/g, '*');
        let result = eval(expression);
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// ===========================================
// TODO LIST FUNCTIONALITY
// ===========================================

let todos = [];
let todoIdCounter = 1;

// Adds a new todo item to the list
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: todoIdCounter++,
            text: text,
            completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
    }
}

// Handles Enter key press in todo input
function handleTodoEnter(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// Toggles the completion status of a todo item
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Removes a specific todo item
function removeTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// Removes all completed todo items
function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

// Removes all todo items
function clearAll() {
    if (todos.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
        todos = [];
        renderTodos();
    }
}

// Renders the todo list in the DOM
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id})">${todo.completed ? '↺' : '✓'}</button>
                <button onclick="removeTodo(${todo.id})" style="background: #e53e3e;">✗</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// ===========================================
// COLOR PALETTE GENERATOR
// ===========================================

// Generates a random color palette and displays it
function generatePalette() {
    const paletteContainer = document.getElementById('colorPalette');
    paletteContainer.innerHTML = '';
    
    // Generate 6 random colors
    for (let i = 0; i < 6; i++) {
        const color = generateRandomColor();
        const colorDiv = createColorDiv(color);
        paletteContainer.appendChild(colorDiv);
    }
}

// Generates a random hex color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Creates a color display div with click-to-copy functionality
function createColorDiv(color) {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    div.style.height = '100px';
    div.style.borderRadius = '8px';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.color = getContrastColor(color);
    div.style.fontWeight = 'bold';
    div.style.cursor = 'pointer';
    div.style.transition = 'transform 0.2s ease';
    div.textContent = color;
    div.title = 'Click to copy color code';
    
    // Add hover effect
    div.addEventListener('mouseenter', () => {
        div.style.transform = 'scale(1.05)';
    });
    
    div.addEventListener('mouseleave', () => {
        div.style.transform = 'scale(1)';
    });
    
    // Copy color to clipboard when clicked
    div.addEventListener('click', () => {
        navigator.clipboard.writeText(color).then(() => {
            div.textContent = 'Copied!';
            setTimeout(() => {
                div.textContent = color;
            }, 1000);
        });
    });
    
    return div;
}

// Determines appropriate text color based on background color
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}

// ===========================================
// THEME TOGGLE FUNCTIONALITY
// ===========================================

// Toggles between light and dark theme
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeButton.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeButton.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// ===========================================
// INITIALIZATION
// ===========================================

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').textContent = '☀️ Light Mode';
    }
    
    // Generate initial color palette
    generatePalette();
    
    // Initialize calculator display
    updateDisplay();
    
    console.log('Personal Productivity Hub initialized successfully!');
});