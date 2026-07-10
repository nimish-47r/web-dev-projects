# Simple Calculator

A clean, minimal calculator built with HTML, CSS, and JavaScript.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division
- **C** — clears the entire display
- **CE** — deletes the last entered character
- Decimal point support
- Dark themed UI with rounded circular buttons and orange-highlighted operators
- Responsive grid-based layout

## How It Works

- Each number/operator button calls `appendToDisplay()`, which appends the clicked value to the display input.
- Pressing `=` calls `calculate()`, which replaces the `÷` and `×` symbols with `/` and `*`, then evaluates the resulting expression.
- If the expression is invalid, the display shows `Error`.
- `C` clears the full display; `CE` removes the last character only.

## Getting Started

No build tools or installations required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate into the project folder:
   ```bash
   cd your-repo-name
   ```
3. Open `index.html` in your browser (or use a tool like the VS Code Live Server extension).
