import React from 'react';
import { Helmet } from 'react-helmet';

const Metadata = () => {
  return (
    <Helmet>
      <title>Play Cafe - Where Board Games Meet Great Food</title>

      <meta
        name="description"
        content="Play Cafe offers a warm and exciting environment for board game enthusiasts to gather, relax, and enjoy great food."
      />

      <meta
        name="keywords"
        content="cafe, board games, food, gaming, cafe near me, snacks, beverages, fun activities"
      />

      <meta name="author" content="Play Cafe" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Tags */}
      <meta
        property="og:title"
        content="Play Cafe - Where Board Games Meet Great Food"
      />
      <meta
        property="og:description"
        content="Join us at Play Cafe for a fun and immersive experience with board games and delicious food!"
      />
      <meta property="og:image" content="URL to image for sharing" />
      <meta property="og:url" content="https://play-cafe.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Play Cafe" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Play Cafe - Where Board Games Meet Great Food"
      />
      <meta
        name="twitter:description"
        content="Play Cafe offers a warm and exciting environment for board game enthusiasts to gather, relax, and enjoy great food."
      />
      <meta name="twitter:image" content="URL to image for sharing" />
      <meta name="twitter:site" content="@YourTwitterHandle" />

      <link rel="canonical" href="https://play-cafe.vercel.app" />

      <meta name="robots" content="index, follow" />

      <meta name="theme-color" content="#ffffff" />
      <meta name="rating" content="General" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
};

export default Metadata;
