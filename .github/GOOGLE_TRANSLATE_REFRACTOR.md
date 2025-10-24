Google Translate refactor — PR guidance

Branch: google-translate-refactor

Summary

This branch contains a focused refactor of the Google Translate integration in the footer component. The change was removed from the `fix/login-and-cors-errors` PR to keep that PR focused on authentication and CORS fixes.

Testing notes

1. Manual test steps
   - Start the frontend dev server: `npm run dev` (from `frontend/` folder).
   - Open the app in a browser and navigate to pages where the footer is visible.
   - Verify the Google Translate control appears and behaves as expected (language selection, translations apply correctly to visible text).
   - Test locale switching and ensure translation widget does not break other UI elements.

2. Edge cases
   - Test on a page with dynamic content (e.g., modals or components that mount/unmount) to ensure translations persist.
   - Test on mobile/responsive breakpoints; verify that UI layout does not break when the translate widget is visible.

3. Screenshots
   - Capture screenshots of the footer in the default language and after selecting a different language.
   - If you submit the PR, attach these screenshots to the PR description.

4. Automated tests
   - If you maintain E2E tests, add a Playwright/Cypress scenario to assert that switching language changes visible text. Note: mocks may be required for the translate API in test envs.

PR template suggestion

- Title: `feat(footer): Google Translate refactor`
- Body: Brief summary, testing steps (copy from above), screenshots, and any known limitations (e.g., behavior on touch devices, accessibility notes).

