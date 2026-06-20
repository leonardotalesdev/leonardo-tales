# 06 UI Design System

## Direction

Preserve the existing interface language:

- Terminal-like AI operating system.
- Dark grid background.
- Amber/gold and green system colors.
- Agent boot logs.
- Command-line feel.
- Minimal premium execution.
- Text-based Leonardo Tales wordmark.

## Current Palette

From `src/app/globals.css`:

- Background: `#0b0c0e`.
- Surface: `#13151a`.
- Muted surface: `#1a1d24`.
- Foreground: `#f3f4f6`.
- Muted foreground: `#9ca3af`.
- Gold accent: `#ffc107`.
- Green accent: `#10b981`.
- Border: `#242831`.

## Typography

Current CSS uses system sans for primary text and system monospace for terminal surfaces.

Keep monospace for:

- Wordmark support labels.
- Navigation command labels.
- Boot logs.
- Chat shell.
- Telemetry.
- System statuses.

## Components

Current major visual components:

- Sticky system header.
- Hero with terminal boot widget.
- Telemetry cells.
- Manifesto/philosophy cards.
- Infrastructure cards with images.
- Core AI chat shell.
- Footer call-to-action.

## Chat UI Rules

The chat should remain part of the operating system metaphor.

When adding real assistant behavior:

- Keep the chat panel in the current visual shell.
- Add contact form fields inside the chat panel, not as a generic external modal unless necessary.
- Preserve compact terminal density.
- Avoid friendly consumer-chat styling that breaks the brand.

## Do Not Redesign

Do not replace the current UI with:

- Generic SaaS hero layout.
- Bright white dashboard.
- Oversized marketing illustrations.
- Cartoon chatbot bubbles.
- Heavy gradients or decorative blobs.
- Large platform navigation before the MVP needs it.
