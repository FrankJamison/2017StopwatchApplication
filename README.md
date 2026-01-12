# Stopwatch + Countdown (Product-Style UI)

A polished, single-page **Stopwatch + Countdown Timer** built with plain HTML/CSS/JavaScript.

This project is designed to demonstrate **clean UI engineering**, **stateful JavaScript**, and **production-minded front-end details** (responsive layout, accessible controls, cache-busting during iteration, and maintainable structure) — without frameworks or a build step.

## Why this matters (Employer/Recruiter view)

- **Real UI work, not a demo snippet:** cohesive product-like layout with consistent components (cards, buttons, inputs, displays).
- **Deliberate UX decisions:** predictable controls, clear validation feedback, and readable digital time presentation.
- **Maintainable engineering:** stable element IDs for JS hooks, simple state model, and isolated styling.
- **Practical constraints handled:** timing loops, tabular time output, and browser caching during rapid iteration.

## Features

### Stopwatch

- Digital output formatted as `mm:ss:hh` (minutes : seconds : hundredths)
- Start/Pause toggle + Clear
- Analog face rendering:
	- Watch-face PNG background
	- Layered “hands” rotated via JavaScript
	- Roles: black hand = seconds, red hand = milliseconds sweep, sub-dial hand = minutes

### Countdown

- Input validation for exact `mm:ss:hh`
- Start/Pause toggle
- Clear/Reset button
- Stops at `00:00:00` and shows “Time is up!”

## Design & UX notes

- **Product-like layout:** two primary cards (Stopwatch + Countdown) with consistent headers, hints, and spacing.
- **High contrast, dark-forward theme:** optimized for a modern “app” feel.
- **Stable, readable time:** stopwatch uses a monospaced font to avoid digit width jitter.
- **Clear error states:** countdown input shows immediate validation feedback.

## Technical overview (Developer view)

### Stack

- HTML + CSS + Vanilla JavaScript
- No dependencies, no bundler, no build pipeline

### Timebase and formatting

- Internal unit: **hundredths of a second** (incremented every ~10ms)
- Display format: `mm:ss:hh`
- Formatting uses two-digit padding per segment.

### State model

- Stopwatch state: `watchTime`, `watchIsRunning`
- Countdown state: `timerTime`, `timerStartTime`, `timerIsRunning`
- UI references cached once on load in a `ui` object.

### Analog rendering

- Hands are positioned with CSS (absolute positioning + transform-origin at the pivot)
- Rotation angles are applied by JS via `style.transform`
- Hand pivots can be tuned via CSS variables (dial/sub-dial centers)

### Input validation (Countdown)

- Strict regex validation for `mm:ss:hh`
- Enforces a maximum of `10:00:00`

## Project structure

```
index.html
README.md
Pseudocode-NoDebugFinal.txt
css/
	myStyles.css
js/
	myScript.js
images/
	stopwatch.png
	hand-minute.svg
	hand-second-red.svg
```

## Run locally

Option A — open directly:

1. Open `index.html` in a modern browser.

Option B — use your local dev host:

- If you have this project mapped to a local host name (e.g., `http://2017stopwatchapplication.localhost/`), just open that URL.

## How to use

### Stopwatch

1. Press **Start** to begin.
2. Press **Pause** to stop.
3. Press **Clear** to reset.

### Countdown

1. Enter a start time using `mm:ss:hh` (example: `01:30:00`).
2. Press **Start**.
3. Press **Pause** to pause.
4. Press **Clear** to reset to `00:00:00`.

## Troubleshooting

- **Countdown won’t start:** ensure the input is exactly `mm:ss:hh` and not greater than `10:00:00`.
- **Timing looks off in a background tab:** browsers can throttle timers in inactive tabs.
- **Not seeing UI updates:** this project uses cache-busting query strings on CSS/JS during iteration; hard refresh (`Ctrl+Shift+R`) if needed.

## Notes for extension

Ideas that fit the current structure:

- Keyboard shortcuts (start/pause/reset)
- Presets for countdown (e.g., 00:30:00, 05:00:00)
- Accessibility pass (announce state changes, improve focus order)
- Higher-precision timekeeping (using `performance.now()` for drift correction)