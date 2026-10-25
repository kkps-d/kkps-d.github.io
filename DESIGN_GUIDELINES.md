# Portfolio site design guidelines

## Direction

A simple, interactive CV. Let the original CV and project content establish personality, with typography and whitespace providing structure.

## Color and themes

| Role       | Light     | Dark      |
| ---------- | --------- | --------- |
| Background | `#FAF6EC` | `#23211E` |
| Foreground | `#23211E` | `#FAF6EC` |

- Use these two colors throughout the interface. Project imagery retains its original colors. The Myanmar location and US education flags use softened colors. Contact logos use muted orange for Gmail, blue for LinkedIn, green for WhatsApp, and gray for GitHub; the filled relocation pin inherits the chip text color.
- Use foreground at 75% opacity for secondary text and 16% for decorative dividers. Keep primary text and essential control boundaries at full contrast; avoid fading whole containers.
- Primary actions use foreground as their fill and background for their text. Secondary actions use underlined text or a thin outline.
- Follow the system theme initially. Provide a clearly labeled theme toggle and remember an explicit choice. Keep hierarchy and layout consistent in both themes.

## Typography

Preserve the weights and sample metrics from `color.html`:

| Role                    | Typeface         | Weight | Size                     | Line height |
| ----------------------- | ---------------- | ------ | ------------------------ | ----------- |
| Main heading            | Playfair Display | 600    | `clamp(32px, 6vw, 56px)` | 1.1         |
| Section headings        | Playfair Display | 500    | `clamp(18px, 3vw, 24px)` | 1.4         |
| Body                    | Inter            | 400    | 16px                     | 1.7         |
| Navigation and metadata | Inter            | 400    | 14px                     | 1.5         |

- Use sentence case and natural letter spacing. Avoid long uppercase labels.
- Keep paragraphs around 60–65 characters wide. Left-align headings and text; reserve centered text for brief standalone messages.
- Use size and spacing to establish hierarchy. Keep decorative serif text out of controls and small metadata.
- Load only the required font weights, use `font-display: swap`, and provide serif and sans-serif fallbacks.

## Layout and spacing

- Center the text column horizontally with an A4 maximum width of 210mm and at least 24px side gutters on narrow screens. Avoid a paper frame or shadow.
- Use a spacing scale of 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Keep related details close; separate sections by 64–96px on desktop and 48–64px on mobile.
- Use a single text column. Place dates beside item headings where space permits, and wrap them below on narrow screens.
- Start with one H1 containing the name at section-heading size and the job title at main-heading size, followed by dot-separated location and contact chips, then the CV summary. Center this content vertically in the initial viewport; let it grow naturally on short screens.
- Follow the introduction with sticky section navigation. Its background and divider span the viewport; its links and controls align to the text column. Underline the section currently being viewed and update it during scrolling and disclosure expansion.
- Project screenshot tracks span the viewport in both directions, with the first screenshot initially aligned to the text column. Keep horizontal scrolling inside each track, preserve image proportions, and offer previous/next controls without autoplay.
- Hide carousel scrollbars while retaining touch, trackpad, and keyboard scrolling. Arrows step between images, aligning each image's left edge with the text column. Include enough trailing space for the last image to reach that alignment.
- Preserve arrow inputs during scrolling animations: each click advances the requested destination. Direct touch, trackpad, or keyboard scrolling takes control from the pending animation target.
- Prefer open sections and thin dividers. Use cards only when grouping content needs a visible boundary; keep corners subtle, around 4px, and avoid decorative shadows.
- Begin projects and education with an A4-column-width 1px rule at 25% foreground opacity, with 48px above the rule and 24px between the rule and heading. Keep item dividers lighter at 16%.
- Omit the rule above work experience while preserving the original spacing: 72px between the sticky header and heading.

## Content and components

- Keep the page to the introduction, work experience, projects, and education, with a CV download and theme control in the sticky header.
- Education follows projects and uses the institution, degree, dates, location, GPA, honors, and recognition from the CV JSON.
- End with a tall, spacious footer containing the footer text from the content JSON.
- Place a small hammer control beside the footer text to reveal local appearance settings: foreground/background pickers for each theme and the font combinations from `color.html`. Load additional fonts only when selected; keep the bundled fonts as the default. Include a reset to the original design.
- Keep appearance controls temporary: do not read or write their settings in local storage; restore the default palette and font combination on reload.
- Each role includes job title, company, location, dates, and a current-role indicator. Clicking its summary toggles the complete experience text; a chevron communicates the interaction.
- Each project includes its original name, technologies, expandable description, a GitHub link when supplied, and screenshots from the archived portfolio. Use the original prototype link for projects without a repository.
- Render content from `public/resume.json`. Preserve stable IDs, structured dates, and source references so the same data can support a resume generator or retrieval system.
- Preserve the full CV text and archived project descriptions. Work experience summaries are short, rewritten overviews grounded in the CV. The current CV takes precedence when sources overlap.

## Interaction and accessibility

- Underline inline links. Provide clear hover, keyboard focus, and active states; do not rely on color alone.
- Use a visible 2px foreground focus outline with an offset. Aim for at least 44px touch targets, including navigation and the theme toggle.
- Keep transitions subtle, around 150–200ms. Respect reduced-motion preferences and avoid scroll-driven decoration.
- Theme clicks briefly show a small, absolutely positioned countdown from 5 to 0 without moving the header. Six clicks within successive 3-second windows reveal a muted RGB background wave; another click stops it. Keep this temporary and disable its motion when reduced motion is requested.
- Fade theme colors over 200ms, including the page, sticky header, text, dividers, and icons. Disable the fade when reduced motion is requested.
- Animate the shared palette at the root so the header, chip text, and SVG fills inherit the same intermediate colors. Avoid independent transitions on every descendant, which can make inherited colors lag or flash.
- Use semantic headings, keyboard-accessible controls, descriptive image alternatives, and a skip-to-content link.
- Check both themes on narrow screens, with keyboard navigation, and at 200% zoom. Ensure muted text remains readable and content does not overlap or clip.
