# Currency Converter

A currency converter built with HTML, CSS, and JavaScript. Supports live conversion between ~165 currencies using the [Frankfurter API](https://frankfurter.dev/).

## Features

- Convert between two currencies in real time as you type
- Two-way input — edit either field and the other updates automatically
- Live exchange rates fetched from the Frankfurter API (no API key required)
- In-memory rate caching to avoid redundant API calls
- Debounced input handling for smoother typing
- Clean, minimal UI

## How It Works

1. Select a "from" and "to" currency from the dropdowns.
2. Type an amount into either input field.
3. The app fetches the exchange rate (`GET https://api.frankfurter.dev/v2/rate/{from}/{to}`), caches it, and converts the amount into the other field.
4. Changing either currency resets the first input to `1` and re-converts.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+, `async/await`, `fetch`)
- [Frankfurter API](https://frankfurter.dev/) for exchange rates

## Running Locally

No installation needed. Clone the repo and open the file directly:

```bash
git clone https://github.com/nimish-47r/currency-converter.git
cd currency-converter
open index.html   # or just double-click it
```


