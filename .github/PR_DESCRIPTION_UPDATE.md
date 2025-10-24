Suggested PR description update for: "Introduce hover-to-pause UX in Today's Specials carousel"

Summary

- Adds a hover-to-pause behavior to the Today's Specials carousel so that when a user hovers over a special card, automatic rotation/auto-advance is paused. This prevents the carousel from changing while the user is interacting with a card.

Files changed

- frontend/src/components/Pages/TodaysSpecial.jsx
  - Added `isHovered` guard in `nextSpecial` and `prevSpecial` so auto-rotation is skipped while hovering.
  - Added inline code comments to document the behavior.

Why

- Improves UX by allowing users to inspect a special without it disappearing due to auto-advance.
- Matches common carousel UX patterns (hover-to-pause).

Behavior change (compatibility)

- This is a small behavioral change to the frontend only. It should not affect backend APIs.
- If you have automated UI tests that rely on auto-rotation timing, update them to account for hover-to-pause behavior.

Release notes / changelog

- Added an Unreleased entry to `CHANGELOG.md` describing the new hover-to-pause UX and pointing to the modified file.

Testing

- Manually tested by hovering over a card and verifying the auto-advance pauses; moving the mouse away resumes auto-advance.
- Consider adding a small E2E test (Cypress/Playwright) that asserts the pause-on-hover behavior.

Notes for reviewers

- This change intentionally modifies UX; please evaluate if hover-to-pause should also be available on touch devices (touch interactions are not affected by hover and the carousel will continue to auto-rotate on touch unless additional handling is added).

