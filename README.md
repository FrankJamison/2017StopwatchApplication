# Stopwatch and Countdown Timer

A polished single-page Stopwatch + Countdown Timer built with plain HTML/CSS/JavaScript.

No dependencies, no build step—open it in a browser or serve it from any static web server.

## Live preview

https://stopwatch.fcjamison.com/

## Features

### Stopwatch

- Digital output formatted as `mm:ss:hh` (minutes : seconds : hundredths)
- Start/Pause/Resume toggle + Clear
- Analog face rendering (PNG face + layered hands rotated via JavaScript)

### Countdown

- Strict input validation for exact `mm:ss:hh`
- Start/Pause/Resume toggle + Clear
- Stops at `00:00:00` and displays “Time is up!”
- Maximum start time: `10:00:00`

## Tech (developer overview)

- **HTML:** [index.html](index.html)
- **CSS:** [css/myStyles.css](css/myStyles.css)
- **JavaScript:** [js/myScript.js](js/myScript.js)
- **Assets:** [images/](images/)

### Timebase and formatting

- Internal unit is **hundredths of a second** (the code increments every ~10ms)
- Display format is `mm:ss:hh` (always 2 digits per segment)

### State model

In [js/myScript.js](js/myScript.js), state is kept in a few globals:

- Stopwatch: `watchTime`, `watchIsRunning`
- Countdown: `timerTime`, `timerStartTime`, `timerIsRunning`

DOM references are cached once on `window.onload` in a `ui` object.

### Analog stopwatch rendering

The analog hands are positioned in CSS and rotated in `updateAnalogHands(time)` using `style.transform`.

## Project structure

```
index.html
README.md
css/
	myStyles.css
images/
	stopwatch.png
	hand-minute.svg
	hand-second-red.svg
js/
	myScript.js
```

## Run locally

### Option A — open directly (simplest)

Open [index.html](index.html) in a modern browser.

### Option B — run a tiny local server (recommended)

Serving from `http://localhost/...` avoids some browser quirks and makes refresh/testing more consistent.

Pick one:

- **Python 3** (from the repo root):
  - `python -m http.server 8080`
  - open `http://localhost:8080/`

- **Node** (no install; uses `npx`):
  - `npx --yes http-server -p 8080 .`
  - open `http://localhost:8080/`

- **VS Code extension:** use “Live Server” and open the served URL.

### Option C — use the included VS Code task (workspace-specific)

This workspace includes a VS Code task that opens Chrome to:

`http://stopwatchandcountdowntimer.localhost/`

Run it via **Terminal → Run Task… → Open in Browser** (or `Tasks: Run Task`).

Notes:

- The task is defined in [.vscode/tasks.json](.vscode/tasks.json).
- This repo ignores `.vscode/` via [.gitignore](.gitignore), so you may need to recreate the task in your own workspace.
- Many setups treat `*.localhost` as loopback; if your machine doesn’t resolve it, add a hosts entry (see next section).
- If you prefer a different URL (like `http://localhost:8080/`), edit the task’s URL string.

## Local host name setup (only if you want the `*.localhost` URL)

If `http://stopwatchandcountdowntimer.localhost/` doesn’t resolve on your machine:

1. Edit your hosts file (Windows):
   - `C:\Windows\System32\drivers\etc\hosts`
2. Add:
   - `127.0.0.1 stopwatchandcountdowntimer.localhost`
3. Serve this folder from a local web server and point that host name at the repo root.

Because this is a static site, any web server works (IIS, Apache, nginx, etc.).

## How to use

### Stopwatch

1. Press **Start** to begin.
2. Press **Pause** to stop.
3. Press **Clear** to reset.

### Countdown

1. Enter a start time as `mm:ss:hh` (example: `01:30:00`).
2. Press **Start**.
3. Press **Pause** to pause.
4. Press **Clear** to reset.

## Common dev tweaks

### Cache-busting during iteration

The CSS/JS includes a query string version in [index.html](index.html) (e.g. `myScript.js?v=...`).

If you change assets and want to force a fresh load:

- bump the `v=...` value in [index.html](index.html), or
- hard refresh in the browser (`Ctrl+Shift+R`).

### Countdown validation

Countdown validation is strict by design:

- Format must be exactly `mm:ss:hh`
- Maximum allowed input is `10:00:00`

If you want a different max, update the regex in `validateStartTime()` in [js/myScript.js](js/myScript.js).

## Troubleshooting

- **Countdown won’t start:** the input must match `mm:ss:hh` exactly and be `<= 10:00:00`.
- **Timing looks off in background tabs:** browsers can throttle timers in inactive tabs.
- **Changes not showing up:** hard refresh (`Ctrl+Shift+R`) or bump the query-string version in [index.html](index.html).
