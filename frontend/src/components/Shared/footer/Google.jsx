import React, { useEffect } from "react";

const Google = () => {
    useEffect(() => {
        window.GoogleInit = () => {
            if (!window.google?.translate?.TranslateElement) {
                setTimeout(window.GoogleInit, 100);
            } else {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,mr,ur,es,ja,ko,zh-CN,nl,fr,de,it,ta,te,ru,ar,pt,th',
                    layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                    defaultLanguage: 'en',
                    autoDisplay: false,
                }, 'google_element');
            }
            cleanUpGadgetText();
        };

        const loadGoogleScript = () => {
            if (!document.getElementById("google_translate_script")) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://translate.google.com/translate_a/element.js?cb=GoogleInit";
                script.id = "google_translate_script";
                script.onerror = () => console.error('Error loading Google Translate script');
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

        if (window.google && window.google.translate) {
            window.GoogleInit();
        }

        return () => {
            // Cleanup logic if necessary
        };
    }, []);

    return (
        <div id="google_element" className="google-translate-container">
            <style jsx>{`
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
                        text-align:center;
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

                    #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span:first-child {
                        display: none;
                    }

                    #google_translate_element .goog-te-gadget-simple .goog-te-menu-value:before {
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

                    body {
                        position: relative !important;
                        top: 0 !important;
                        background-color: #f8faff; /* Light blue background for website */
                        color: #333; /* Default text color */
                        font-family: 'Inter', sans-serif; /* Clean font for readability */
                    }

                    /* Extra hover effects for any clickable elements */
                    a, button {
                        transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease;
                    }

                    a:hover, button:hover {
                        color: #0056b3; /* Darker blue on hover */
                        transform: translateY(-3px); /* Slight lift on hover */
                    }
                `}</style>
        </div>
    );
};

export default Google;
