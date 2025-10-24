import { useEffect } from 'react';

const Google = () => {
  useEffect(() => {
    // Guard against double initialization across multiple mounts or race conditions
    // Use a global flag so subsequent calls are no-ops once initialized.
    window.GoogleInit = () => {
      if (window.__googleTranslateInitialized) return;

      if (!window.google?.translate?.TranslateElement) {
        // Retry init shortly; store timeout id so we can clear it on unmount
        window.__googleTranslateTimeout = setTimeout(
          () => window.GoogleInit(),
          100
        );
        return;
      }

      // Create the TranslateElement and mark initialized immediately after
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages:
            'en,hi,mr,ur,es,ja,ko,zh-CN,nl,fr,de,it,ta,te,ru,ar,pt,th',
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          defaultLanguage: 'en',
          autoDisplay: false,
        },
        'google_element'
      );

      window.__googleTranslateInitialized = true;

      cleanUpGadgetText();
    };

    const loadGoogleScript = () => {
      // Avoid injecting the script if already initialized or script present
      if (window.__googleTranslateInitialized) return;
      if (!document.getElementById('google_translate_script')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=GoogleInit';
        script.id = 'google_translate_script';
        script.onerror = () =>
          console.error('Error loading Google Translate script');
        document.body.appendChild(script);
      }
    };
    const cleanUpGadgetText = () => {
      const gadgetElement = document.querySelector('.goog-te-gadget');
      if (gadgetElement) {
        const textNodes = gadgetElement.childNodes;
        textNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = ''; // Clear text content
          }
        });
      }
    };
    loadGoogleScript();

    // If the google object is already present (script previously loaded),
    // call init only if we haven't already initialized. This prevents a
    // race where loadGoogleScript() and an immediate call both create the
    // TranslateElement resulting in duplicates.
    if (
      !window.__googleTranslateInitialized &&
      window.google &&
      window.google.translate
    ) {
      window.GoogleInit();
    }

    return () => {
      // Cleanup: remove injected script, clear timers, and remove global initializers
      try {
        const script = document.getElementById('google_translate_script');
        if (script) {
          // Clear handlers then remove
          script.onerror = null;
          script.onload = null;
          if (script.parentNode) script.parentNode.removeChild(script);
        }
      } catch (e) {
        void e;
      }

      // Clear any pending retry timeout
      try {
        if (window.__googleTranslateTimeout) {
          clearTimeout(window.__googleTranslateTimeout);
          delete window.__googleTranslateTimeout;
        }
      } catch (e) {
        void e;
      }

      // Remove global init functions/flags to avoid leaks and double inits
      try {
        if (window.GoogleInit) {
          try {
            delete window.GoogleInit;
          } catch (e) {
            window.GoogleInit = undefined;
          }
        }
      } catch (e) {
        void e;
      }

      try {
        if (window.__googleTranslateInitialized) {
          try {
            delete window.__googleTranslateInitialized;
          } catch (e) {
            window.__googleTranslateInitialized = undefined;
          }
        }
      } catch (e) {
        void e;
      }

      // Clear the translate container content (remove injected nodes)
      try {
        const el = document.getElementById('google_element');
        if (el) el.innerHTML = '';
      } catch (e) {
        void e;
      }
    };
  }, []);

  return (
    <div id="google_element" className="google-translate-container">
      <style>{`
        .goog-te-combo {
          background-color: #f0f8ff; /* Soft blue background */
          border-radius: 0.3rem; /* Rounded corners */
          padding: 8px 4px;
          font-size: 1.1rem;
          transition: all 0.3s ease-in-out; /* Smooth transition */
          outline: none;
          color: #007bff; /* Blue text */
          font-weight: 400; /* Tailwind: font-medium */
          cursor: pointer;
          text-align: center;
        }

        .goog-te-combo:hover {
          background-color: #e6f0ff; /* Lighter blue on hover */
          border-color: #0056b3; /* Darker blue on hover */
          color: #0056b3; /* Darker blue text */
        }

        .goog-logo-link {
          display: none !important; /* Hide Google logo */
        }

        .goog-te-gadget {
          color: transparent !important;
        }

        .goog-te-gadget > span > a {
          display: none !important;
        }

        .goog-te-gadget .goog-te-combo {
          color: #004d43 !important; /* Blue text */
        }

        .goog-te-gadget .goog-te-combo:hover {
          color: #004d53 !important; /* Darker blue text on hover */
        }

        #google_translate_element
          .goog-te-gadget-simple
          .goog-te-menu-value
          span:first-child {
          display: none;
        }

        #google_translate_element
          .goog-te-gadget-simple
          .goog-te-menu-value:before {
          content: 'Translate'; /* Custom text */
          color: #007bff; /* Blue text */
          font-weight: 600; /* Slightly bolder */
        }

        .goog-te-banner-frame {
          display: none !important; /* Hide the banner frame */
        }

        .goog-te-menu-frame {
          max-height: 400px !important;
          overflow-y: auto !important;
          background-color: #ffffff; /* White background for dropdown */
          border: 2px solid #007bff; /* Blue border */
          border-radius: 0.75rem; /* Rounded corners */
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1); /* Soft blue shadow */
        }

        /* Customize the iframe */
        .skiptranslate > iframe {
          height: 0 !important;
          border-style: none;
          box-shadow: none;
        }

        /* Scoped styles for the Google Translate widget only.
                       Global page styles (body, default font, background) were removed
                       to avoid polluting the app. Move global font/background to a theme
                       or global stylesheet if needed. */
        .google-translate-container {
          background-color: #f8faff; /* Widget background */
          color: #333; /* Widget text color */
          font-family:
            'Inter', sans-serif; /* Widget font (prefer setting globally) */
          position: relative;
          top: 0;
        }

        /* Scoped hover effects only for links/buttons inside the widget */
        .google-translate-container a,
        .google-translate-container button {
          transition:
            color 0.3s ease-in-out,
            background-color 0.3s ease-in-out,
            transform 0.3s ease;
        }

        .google-translate-container a:hover,
        .google-translate-container button:hover {
          color: #0056b3; /* Darker blue on hover */
          transform: translateY(-3px); /* Slight lift on hover */
        }
  `}</style>
    </div>
  );
};

export default Google;
