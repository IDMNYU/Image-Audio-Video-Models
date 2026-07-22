# Handoff: Federated Data for Creative Communities — Brand & Site Skin

## Overview
This is the visual design system for the **Federated Data for Creative Communities**
grant project — a Risograph-inspired brand language to "skin" the project's website.
The system marries three fluorescent spot inks to a sleek, square, white-space-forward
layout discipline: elegant where it can be, playful where it wants to be.

The goal for this handoff is to **apply this system when building the site** — its pages
(home, about/charter, how-it-works, node map, etc.) are not yet designed as final screens.
What's specified here is the *kit of parts* (color, type, shape, components, layout
registers) to build those pages from.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show
the intended look and vocabulary, **not production code to copy directly**. They are authored
in a lightweight in-house component format (`.dc.html`, which needs the bundled `support.js`
to render in a browser). Do **not** ship these files. Instead, **recreate the system in the
target codebase's environment** (React/Vue/Svelte/Astro/plain HTML+CSS — whatever the site
uses, or your best choice if none exists yet) using its established patterns.

Treat `support.js` and the `.dc.html` wrapper as scaffolding for previewing only; everything
you need is the markup/styles inside them plus this README.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component treatments are final and exact.
Reproduce them precisely. The one thing that is *not* final is page-level composition — there
are no locked-down page layouts yet, only the reusable pieces and three "in use" layout
registers to compose from.

---

## Design Tokens

### Color
| Token | Hex | Role |
|---|---|---|
| Fluoro Pink | `#ff2d9b` | **Primary.** Headlines accents, CTAs, the signature ink. |
| Signal Blue | `#1f5cff` | Direction & links. Arrows, navigation, hover state for links. |
| Jade | `#12b37d` | Affirmative. Consent, "online", growth. |
| Cool Gray | `#9b9b9b` | Muted marks, secondary data. |
| Ink | `#111111` | Type, 1px outlines, dark tiles/stages. |
| Oxblood | `#451018` | Rich dark stage for hero / playful card moments. |
| White | `#ffffff` | The default surface. White space is load-bearing — it's what makes the spot inks ring. |
| Ink on jade | `#04140e` | Text color when set on a Jade fill (near-black green). |

**Usage rules:** Flat color only — no gradients, no drop shadows, no tints. One dominant
color per surface; the others enter as small accents. Generous white space around color.

### Typography
Three families in **strict roles**. Load from Google Fonts.

| Role | Family | Weight | Notes |
|---|---|---|---|
| Headlines & data/numerals | **Space Mono** | 700 (400 for running data) | Typewriter voice. Tighten `word-spacing: -0.16em` on multi-word headlines and `-0.12em` on section titles to counteract monospace's wide spaces. `letter-spacing: -0.01em` to `-0.02em`. |
| Body & interface | **Space Grotesk** | 400–600 | Paragraphs, UI, labels, buttons. |
| Subheadings only | **Cormorant** | 500–600, italic 500 | The single note of elegance. Serif. Reserve for subheads and pull-quotes — never body, never labels. |
| (fallback body sans) | **DM Sans** | 400–500 | Used for small descriptive captions in the spec sheets; Space Grotesk is the primary body face. Optional — you may standardize on Space Grotesk. |

> Note: during review some section *titles* were hand-tuned to Space Grotesk instead of Space
> Mono. The canonical rule is **Space Mono for headlines**; use Space Grotesk section titles
> only if you deliberately prefer that softer look. Pick one and stay consistent.

**Type scale (px, desktop / compact):**
- Display 80 / 44
- Heading 38 / 27
- Body 16 / 17 (line-height 1.6)
- Label 11 / 12 (uppercase, `letter-spacing: 0.14em`)

Eyebrows/labels: Space Mono, uppercase, `letter-spacing: 0.14em`, often in Fluoro Pink.

### Shape & form
- **Corners: square. `border-radius: 0` everywhere.** The only curve allowed is a true circle
  (status dots, the concentric "bloom" motif, starburst tokens).
- **Depth = one 1px ink outline**, implemented as `box-shadow: inset 0 0 0 1px #111`
  (occasionally `1.5px` for secondary buttons). **No drop shadows, ever.**
- **Hairline dividers / section rules:** `1px solid #111` (top border on each section);
  faint internal rules `1px solid rgba(0,0,0,0.14)`.
- **Grid gaps:** 16px is the standard gutter between cards/blocks; 2px "hairline" gaps over an
  ink background create outlined-cell grids (see the color and type spec grids).

### Spacing
- Page container: `max-width: 1160px`, side padding `56px`.
- Section rhythm: `margin-top: 96px` between major sections; `18px` below a section's top rule.
- Card padding: `24px` (compact) to `44px` (feature). Hero fields: `64px 52px`.
- Swatch/spec cell inner padding: `16px`.

### Motion (recommended, from the parent system)
Slow and meditative, not bouncy. Enter fades ~600ms ease-out `cubic-bezier(0.16,1,0.3,1)`;
state changes ~350ms; press feedback ~120ms. Buttons **dim on press** (primary → 0.78 opacity,
outline → 0.55) rather than lifting or recoloring. No decorative infinite loops.

---

## The Shape / Graphic Set
A flat riso vocabulary. Each is a simple SVG, square-cropped inside a card. Exact SVG source
is in the design file (section 03); recreate as inline SVG or React components.

1. **Arrow** — a fat block arrow (rectangle stem + triangle head), rotatable to any 45° step.
   Fill = Pink or Blue. Signals direction/CTA.
2. **% stack** — 3–4 percentages stacked, Space Mono 700, each a different ink
   (pink/blue/jade/gray) on an Ink (`#111`) card. Signals data.
3. **Bloom** — two stacked sets of 3 concentric ellipses (like a figure-8 / "0"), 4px stroke,
   `fill: none`, jade or blue stroke with a pink center tick. Organic counterpoint.
4. **Starburst token** — 16-point star (`M50 2l9 13 15-6 …`), Pink fill, a white Space Mono
   numeral centered. Used for step numbers / tokens.
5. **Facet field** — a shattered polygon field in all four inks over Ink. Texture/pattern fill.
6. **Scallop** — 4 overlapping circle outlines (blue/jade/pink), 4px stroke. Playful cluster.

---

## Components

### Buttons (square, flat, dim-on-press)
- **Primary (solid):** `background:#111; color:#fff;` Space Mono 700, `font-size:12px`,
  `letter-spacing:0.1em`, UPPERCASE, `padding:12px 18px`. No radius.
- **Accent primary:** same but `background:#ff2d9b` (Pink), often with a trailing `→`.
- **Outline/secondary:** transparent, `box-shadow: inset 0 0 0 1.5px #111`, ink text, same type.
- Press: reduce opacity (primary 0.78, outline 0.55). Disabled 0.40.

### Tags / pills (square, NOT rounded)
Space Mono `12px`, `letter-spacing:0.04em`, `padding:6px 12px`, square corners.
- Filled: `background:#1f5cff; color:#fff` ("federated"); `background:#12b37d; color:#04140e`
  ("consent-first").
- Outline: `box-shadow: inset 0 0 0 1.5px #111` ("open").

### Status indicator
10px circle (`border-radius:50%`) in Jade + a Space Mono 13px label, e.g. "node online".

### Step token
The starburst SVG (Pink) with a centered white numeral. ~44–76px.

### Data tile
Ink (`#111`) block, `padding:24px`. Mono uppercase gray eyebrow (top), a huge Space Mono 700
numeral (`52px`, Jade with a Pink `%`), and a small white 0.7-opacity caption (bottom).
Layout via `flex-direction:column; justify-content:space-between`.

---

## Layout Registers ("In use")
Three ways to compose the same system — mix per page section:

1. **Field** — a full-bleed single-color panel (e.g. Pink), white Space Mono headline, a
   Cormorant italic line beneath. `padding:64px 52px`. Maximum impact; use for heroes.
   Intended hero headline size: `clamp(34px, 4.6vw, 56px)`, `line-height:1.04`,
   `letter-spacing:-0.02em`.
2. **Gallery grid** — 4-column grid, `gap:16px`, of square cells: some solid color, some
   white with a 1px outline holding an arrow / numeral. Calm, white-dominant. Use for
   indexes, feature rows, node listings.
3. **Deck stage** — an Oxblood (`#451018`) panel, `padding:36px`, holding a grid of 3:4
   portrait cards drawn from the shape set (arrow, % stack, bloom, jade consent card…).
   Playful; use for "how it works", campaign moments, decks.

---

## Interactions & Behavior (to implement when skinning)
- **Links:** default Pink (`#ff2d9b`) with a `1.5px` solid underline; hover → Blue (`#1f5cff`).
  Set these globally so authored links never fall back to browser blue.
- **Selection:** `::selection { background:#ff2d9b; color:#fff; }`.
- **Buttons:** dim-on-press as above; no elevation change.
- **Responsive:** the 1160px container should fluidly narrow; multi-column grids collapse to
  fewer columns on tablet and to 1–2 columns on mobile. Display type uses `clamp()` already.
  Keep 56px gutters on desktop, reduce to ~24px on mobile. Hit targets ≥ 44px.

## State Management
None required for the design system itself. When building interactive site features
(node map, contribution flow, consent toggles), use the target framework's normal state
patterns; this system only dictates appearance.

## Assets
No raster assets. All graphics are inline SVG (see the shape set) built from the palette.
Fonts are Google Fonts: **Space Mono, Space Grotesk, DM Sans, Cormorant**.

Google Fonts link used:
```
https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Cormorant:ital,wght@0,500;0,600;1,500&display=swap
```

## Files in this bundle
- `Federated Data - Design System.dc.html` — the full system: 01 Color, 02 Typography,
  03 Shape language, 04 Components, 05 In use. **Primary reference.**
- `Type Explorations.dc.html` — four *rejected* alternative type pairings (Plex, Martian,
  Editorial, Spline), kept for context. Not part of the live system.
- `support.js` — runtime needed only to preview the `.dc.html` files in a browser. Not for
  production.

## How to use this in Claude Code
1. Download this folder (zip) and drop it into your site's repository (e.g. at the repo root
   or in a `design/` directory).
2. Open the repo in Claude Code.
3. Point Claude Code at this README, e.g.:
   > "Read `design_handoff_website_skin/README.md`. Set up the design tokens (colors, fonts,
   > spacing) in our codebase, build the shared components (Button, Tag, StatusDot, StepToken,
   > DataTile, and the SVG shape set), then skin the home page using the Field + Gallery
   > registers described. Match the hi-fi tokens exactly."
4. To preview the original HTML references, open the `.dc.html` files in a browser (they load
   `support.js` from this same folder).
