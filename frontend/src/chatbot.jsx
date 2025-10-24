import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Set the chatbot config
    window.embeddedChatbotConfig = {
      chatbotId: 'rL36bLvnKl-LBrT-vmYpR',
      domain: 'www.chatbase.co',
    };

    // Create the script element to load the chatbot
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'rL36bLvnKl-LBrT-vmYpR');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="chatbot" />;
};

export default Chatbot;
