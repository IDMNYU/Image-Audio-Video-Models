# Open-Source AI Model Landscape

A static reference site cataloguing open-source image, video, and audio generation models — covering license type, training data provenance, attribution mechanisms, commercial-use terms, and known data/IP gaps for each model.

Built for the Federated Data Commons for Creative Communities (FDCCC) project at NYU.

## Site

Plain HTML/CSS/JS, no build step or framework:

- [`index.html`](index.html) — page structure
- [`styles.css`](styles.css) — styling
- [`script.js`](script.js) — search, filtering, sorting, and modal logic
- [`data.js`](data.js) — the model dataset, as a `MODELS` array

To add a model, append an object to `MODELS` in `data.js` following the existing field structure, then commit and push — GitHub Pages picks up the change automatically.

## Running locally

Any static file server works, e.g.:

```
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Hosting

Served via GitHub Pages from this repo.
