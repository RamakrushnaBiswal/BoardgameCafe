import React, { useState, useEffect } from 'react';
import { Github, Loader2 } from 'lucide-react';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/repos/RamakrushnaBiswal/PlayCafe/contributors'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data = await response.json();

        // Fetch additional user details for each contributor
        const contributorsWithDetails = await Promise.all(
          data.map(async (contributor) => {
            const userResponse = await fetch(contributor.url);
            const userData = await userResponse.json();
            return {
              ...contributor,
              name: userData.name || userData.login,
              bio: userData.bio,
              location: userData.location,
              company: userData.company,
            };
          })
        );

        setContributors(contributorsWithDetails);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
            Error loading contributors: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Github className="w-8 h-8" />
            GitHub Contributors
          </h1>

          {/* Gradient Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 mb-6"></div>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Thanks to our amazing contributors who help build and improve this
            project! 🎉
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          /* Contributors List */
          <div className="space-y-3">
            {contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        {contributor.name || contributor.login}
                      </a>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{contributor.login}
                      </p>
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {contributor.contributions} contributions
                    </span>
                  </div>
                  {(contributor.bio || contributor.location) && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {contributor.bio && <p>{contributor.bio}</p>}
                      {contributor.location && (
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          📍 {contributor.location}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repository Link */}
        <div className="mt-12 text-center">
          <div className="text-gray-700 dark:text-gray-300 font-medium mb-4">
            Explore more on our GitHub repository:
          </div>
          <a
            href="https://github.com/RamakrushnaBiswal/PlayCafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            Visit Repository
          </a>
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 mt-12"></div>
      </div>
    </div>
  );
};

export default Contributors;
