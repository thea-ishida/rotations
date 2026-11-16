# Rotations

A small web page for DIGIHUM 2120 (Creative Sprint 10). It shows a volleyball team's coach feedback system two ways:

- **Rotation view:** each week, one coach watches one positional group and sets one or two skill focuses with them, based on what the group said. Then the coaches rotate.
- **Score only:** the same week reduced to one weighted "team practice index." The focuses are picked automatically from the lowest sub-scores. A button reveals what the score left out: what each group said, and what their coach would have picked.

Groups are always shown in the same order. Nothing is ranked.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure |
| `style.css` | Styles |
| `app.js` | Logic: week stepping, view toggle, score and picks |
| `content.js` | **All editable text and data.** Edit this file, not the code. |

## Editing the content

Open `content.js`:

- `groups[].weeks[].note` is what the group said that week. Every note is currently a **stand-in drafted by AI**. Replace each one with your own paraphrase, with no names, and set `standIn: false` to remove the "stand-in" badge.
- `groups[].weeks[].coachFocus` is the one or two focuses the coach set with the group. These are also stand-ins.
- `groups[].skills[].scores` are invented sub-scores, one per week. The page labels them as made up.
- `weight` on each group, plus `weightsSetBy`, control the locked score weights and the note about who set them.

## Run locally

Open `index.html` in a browser. No build step and no libraries are needed.

## Publish with GitHub Pages

1. Push this repo to `github.com/thea-ishida/rotations`.
2. On GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, then **Save**.
4. After a minute or two the page is live at **https://thea-ishida.github.io/rotations/**.

## Credits

Made by Thea Ishida. Readings: Chouinard, Ellison and Ridgeway, "The Sustainable Economy," *Harvard Business Review* (2011); "Lifetime of Achievement in Sustainability: Yvon Chouinard," *Sustainability Magazine* (2024).

