# Open-Source AI Model Landscape

A static reference site cataloguing open-source image, video, and audio generation models — covering license type, training data provenance, attribution mechanisms, commercial-use terms, and known data/IP gaps for each model.

Built for the Federated Data Commons for Creative Communities (FDCCC) project at NYU.

## Site

Plain HTML/CSS/JS, no build step or framework:

- [`index.html`](index.html) — page structure
- [`styles1.css`](styles1.css) — styling
- [`script.js`](script.js) — search, filtering, sorting, and modal logic
- [`data.js`](data.js) — the model dataset, as a `MODELS` array

## Adding a model

Append an object to `MODELS` in `data.js` following the existing field structure, then commit and push — GitHub Pages picks up the change automatically.

All fields:

```js
{
  model: "Model Name",
  developer: "Developer",
  year: "2024",
  modality: "Image" | "Video" | "Audio",
  io: "Text → Image",
  licenseType: "Fully Open" | "Permissive" | "Restricted-Open" | "Mixed",
  licenseName: "Apache 2.0",
  dataDisclosed: "Full" | "Partial" | "No",
  dataSources: "...",
  attribution: "...",
  commercialUse: "Full" | "Yes" | "Partial" | "No",
  finetune: "Yes" | "Partial" | "No",
  checkpoint: "Yes" | "No",
  api: "Yes" | "No",
  exportFormat: "PNG, JPG",
  openSource: "Yes" | "No",
  dataGap: "...",
  notes: "..."
}
```

## Adding a ComfyUI workflow

To attach a ComfyUI workflow and output image to a model's detail view, place the files in a subfolder under `Image Audio Video Models/`:

```
Image Audio Video Models/
  Your Model Name/
    workflow.json       ← ComfyUI workflow export
    output.png          ← example output image
```

Then add a `workflow` field to the model's entry in `data.js`:

```js
workflow: { folder: "Your Model Name", json: "workflow.json", image: "output.png" }
```

The filenames can be anything — just make sure `folder`, `json`, and `image` match exactly. When a visitor clicks the model card, the modal will show three tabs: **Details**, **Output**, and **Workflow JSON**. Models without a `workflow` field show only the Details tab.

## Running locally

Any static file server works, e.g.:

```
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Hosting

Served via GitHub Pages from this repo.
