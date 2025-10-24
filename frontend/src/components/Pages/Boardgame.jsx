import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import CARROM from '../../assets/Boardgames/CARROM.webp';
import board1 from '../../assets/Boardgames/board1.png';
import board2 from '../../assets/Boardgames/board2.png';
import board3 from '../../assets/Boardgames/board3.jpg';
import board4 from '../../assets/Boardgames/board4.png';
import board5 from '../../assets/Boardgames/board5.png';
import board6 from '../../assets/Boardgames/board6.png';
import board7 from '../../assets/Boardgames/board7.png';
import board8 from '../../assets/Boardgames/board8.png';
import board10 from '../../assets/Boardgames/board10.png';
import ludo from '../../assets/Boardgames/ludo.jpg';
import snake from '../../assets/Boardgames/snake.jpg';
import tic from '../../assets/Boardgames/tic.png';
import uno from '../../assets/Boardgames/uno.jpg';
import word from '../../assets/Boardgames/word.jpg';
import war from '../../assets/Boardgames/war.jpg';
import bg from '../../assets/Boardgames/bg.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MainHOC from '../MainHOC';
export default MainHOC(Boardgame);
function Boardgame() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to /newsletter/subscribe endpoint using fetch
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert('Subscription successful! Check your email for confirmation.');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Error subscribing. Please try again.');
    }
  };

  const handleOpenInstructions = (board) => {
    setSelectedBoard(board);

    // Scroll to the modal when it's opened to ensure it's centered in the viewport
    setTimeout(() => {
      const modalElement = document.getElementById('modal-instructions');
      if (modalElement) {
        modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); // Adding a slight delay ensures that modal is rendered before scrolling
  };

  const handleCloseInstructions = () => {
    setSelectedBoard(null);
  };
  const boards = [
    {
      src: 'https://th.bing.com/th/id/OSK.HEROqYqMhD-y4GKqP62-uYHPi1C0P_LIEmg92q6L1uwt3xo?rs=1&pid=ImgDetMain',
      title: 'Monopoly',
      description:
        'Buy, sell, and trade properties to bankrupt your opponents.',
      instructions: [
        'Players roll two six-sided dice to determine how many spaces they can move around the board.',
        'When a player lands on an unowned property, they can choose to buy it at the price listed on the space.',
        'If a player lands on a property owned by another player, they must pay rent, which varies depending on property development.',
        'Players can build houses and hotels on their properties to increase the rent other players must pay when they land there.',
        "Landing on 'Chance' or 'Community Chest' squares requires drawing a card that can provide rewards or impose penalties.",
        'The game continues until all but one player is bankrupt, with the last remaining player declared the winner.',
      ],
    },
    {
      src: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1088150/capsule_616x353.jpg?t=1605966437',
      title: 'Scribble',
      description:
        'Create words on a board using letter tiles and score points based on letter value.',
      instructions: [
        'Players take turns creating words on a grid using letter tiles.',
        'Each letter has a designated point value, and players score based on the total points of the letters used.',
        'Players can create new words by adding letters to existing words on the grid, forming crosswords.',
        'Bonus spaces on the board may multiply the points for specific words or letters.',
        'The player with the highest total score at the end of the game wins.',
      ],
    },
    {
      src: 'https://th.bing.com/th/id/OIP.dRy3iD5zetm02WmkuYW2bQAAAA?rs=1&pid=ImgDetMain',
      title: 'Chess',
      description:
        "A strategic game of checkmate, where two players move pieces to capture the opponent's king.",
      instructions: [
        'Each player begins with 16 pieces: 1 king, 1 queen, 2 rooks, 2 knights, 2 bishops, and 8 pawns.',
        'Players take turns moving one piece at a time according to the specific movement rules of each piece.',
        "The objective is to checkmate the opponent's king, meaning the king is under threat of capture with no legal moves to escape.",
        'If a king is in check, the player must make a move to remove the check on their next turn.',
        'The game can end in checkmate, stalemate, or draw based on various conditions, including insufficient material to checkmate.',
      ],
    },
    {
      src: 'https://th.bing.com/th/id/OIP.BEqgB5UEEz92gHe3XzLbRAHaEx?rs=1&pid=ImgDetMain',
      title: 'Life',
      description:
        'Simulate life by choosing a career, family, and lifestyle to accumulate wealth and happiness.',
      instructions: [
        'Players spin a wheel to determine how many spaces to move on the board, making choices along the way.',
        'As players progress, they make decisions about careers, education, and family, which affect their financial situation.',
        'Collect salary and pay bills, and make strategic investments to grow wealth.',
        'At the end of the game, players tally their wealth and happiness to determine who has led the most successful life.',
      ],
    },
    {
      src: 'https://i1.wp.com/www.boardgameanalysis.com/wp-content/uploads/2020/01/DSC_5586.jpg?fit=1200%2C905&ssl=1',
      title: 'Catan',
      description:
        'Settle the island of Catan in this classic resource management game.',
      instructions: [
        'Players roll two six-sided dice to gather resources based on the hexes adjacent to their settlements.',
        'Trade resources with other players to obtain what you need to build roads, settlements, and cities.',
        'Construct roads to expand your territory and connect to resource-rich areas.',
        'The first player to reach 10 victory points through building and development wins the game.',
      ],
    },
    {
      src: board2,
      title: 'Ticket to Ride',
      description:
        'Connect cities across a map and complete your railway routes.',
      instructions: [
        'Players collect train cards of various colors to claim routes on the map between cities.',
        'To claim a route, players must play a number of cards matching the color and length of the route.',
        'Longer routes earn more points, and players can complete secret destination tickets for bonus points.',
        'The game ends when a player has two or fewer trains left, at which point final scores are calculated.',
      ],
    },
    {
      src: board3,
      title: 'Pandemic',
      description:
        'Work together to contain the spread of deadly diseases across the globe.',
      instructions: [
        'Players take on different roles with unique abilities to strategize and treat infections.',
        'Move your character around the board to cities to treat infections, build research stations, and discover cures.',
        'Collaborate with teammates to manage outbreaks and ensure diseases do not spread out of control.',
        'The team wins by discovering cures for all four diseases before they spread excessively.',
      ],
    },
    {
      src: 'https://th.bing.com/th/id/OIP.8GSKPTci8prggscpqzpQTAHaDt?rs=1&pid=ImgDetMain',
      title: 'Codenames',
      description:
        "Compete to make word associations and guess your team's secret code words.",
      instructions: [
        'Players are divided into two teams, each with a Spymaster and field operatives.',
        'The Spymaster gives one-word clues that relate to multiple words on the grid.',
        'Field operatives discuss and guess the words based on the clues given by their Spymaster.',
        "The first team to correctly guess all their words without picking the opposing team's words wins.",
      ],
    },
    {
      src: 'https://th.bing.com/th/id/OIP.uQnK77iWmXoZHH1xgrHXLwHaHa?rs=1&pid=ImgDetMain',
      title: 'Azul',
      description:
        'Collect and place beautiful tiles to decorate the walls of a palace.',
      instructions: [
        'Players take turns drafting tiles from a central market and placing them on their boards.',
        'Tiles must be placed in rows and can only be added if they complete a row or column.',
        'Earn points for completed rows and patterns, and lose points for unplaced tiles.',
        'The game ends when one player completes a row on their board, and the player with the most points wins.',
      ],
    },
    {
      src: 'https://th.bing.com/th/id/OIP.zie_-I5v0VE5cwVk1P9tswHaEK?rs=1&pid=ImgDetMain',
      title: 'Cluedo',
      description:
        'Solve the mystery of who committed the murder in the mansion.',
      instructions: [
        'Players move their pieces around the mansion to gather clues about the murder.',
        'Make deductions about the suspect, weapon, and room based on the clues gathered.',
        "Players can make suggestions and must keep track of their findings and other players' clues.",
        'The first player to correctly identify the murderer, weapon, and location wins the game.',
      ],
    },
    {
      src: 'https://th.bing.com/th/id/R.928702e46c4d6f8a5e6ae7a98abc507d?rik=h6j8OdTmlyLETQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-LL5zs-V6z9Y%2fTil9973hSbI%2fAAAAAAAAAp8%2fC9J5Q3NhWJc%2fs1600%2fstratego-1.jpg&ehk=2C4%2f8CFzZloqDXImPW2gPpTTTPmBLS0mr%2bjXP39OC3s%3d&risl=&pid=ImgRaw&r=0',
      title: 'Stratego',
      description:
        'Outwit your opponent by moving pieces to capture the flag while protecting your own.',
      instructions: [
        'Players secretly set up their pieces on the board, each with a specific rank and ability.',
        "Move pieces strategically to capture the opponent's flag while defending your own.",
        'Combat occurs when two pieces occupy the same space, with the higher-ranked piece capturing the lower one.',
        "The game ends when one player successfully captures the opponent's flag.",
      ],
    },
    {
      src: 'https://c8.alamy.com/comp/A6GN87/anti-monopoly-board-game-A6GN87.jpg',
      title: 'Anti-Monopoly',
      description:
        'A twist on Monopoly where competitors and monopolists clash in different business strategies.',
      instructions: [
        'Players choose to be either a monopolist or a competitor at the start of the game.',
        'Monopolists can form monopolies and charge higher rents on their properties.',
        'Competitors aim to disrupt monopolies and benefit from lower prices and fewer fees.',
        'The game ends when one group dominates the market, leading to victory.',
      ],
    },
    {
      src: ludo,
      title: 'Ludo',
      description:
        'A classic board game where players race their tokens from start to finish based on dice rolls.',
      instructions: [
        'Players take turns rolling a single die to move their tokens around the board.',
        'To enter a token onto the board, players must roll a 6. Tokens move based on the number rolled.',
        "Players can send opponents' tokens back to start by landing on the same space.",
        'The first player to move all their tokens into the home area wins the game.',
      ],
    },
    {
      src: snake,
      title: 'Snake and Ladders',
      description:
        'A race game where players climb ladders and avoid snakes to reach the end.',
      instructions: [
        'Players take turns rolling a die to advance their token along the numbered board.',
        'If a player lands at the base of a ladder, they climb to the top.',
        'If a player lands on the head of a snake, they slide down to its tail.',
        'The first player to reach the last square wins the game.',
      ],
    },
    {
      src: tic,
      title: 'Tic-Tac-Toe',
      description:
        'A simple two-player game where players try to get three of their symbols in a row.',
      instructions: [
        'Players take turns placing their symbol (X or O) in an empty square on a 3x3 grid.',
        'The first player to align three symbols vertically, horizontally, or diagonally wins.',
        'If all squares are filled without a winner, the game ends in a draw.',
      ],
    },
    {
      src: uno,
      title: 'Uno',
      description:
        'A popular card game where players try to be the first to play all their cards.',
      instructions: [
        'Players take turns matching a card from their hand to the top card of the discard pile by color or number.',
        'Special action cards can change the gameplay, like skipping a turn or reversing play direction.',
        "When a player has one card left, they must yell 'Uno!' to warn others.",
        'The first player to play all their cards wins the game.',
      ],
    },
    {
      src: word,
      title: 'Word Finder',
      description:
        'A fun puzzle game where players create words from a set of letters and fit them into designated boxes.',
      instructions: [
        'Players are given a list of words to find, each composed of letters that can be rearranged.',
        'A grid of boxes is provided, where players must fit the words either horizontally, vertically, or diagonally.',
        'Each word must be filled in completely, and letters cannot be reused for different words.',
        'The goal is to fill in all the boxes with the given words as quickly as possible.',
      ],
    },
    {
      src: war,
      title: 'War',
      description:
        'A simple two-player card game where players compete to win all the cards.',
      instructions: [
        'The deck is shuffled and split evenly between the two players.',
        'Each player reveals the top card of their stack at the same time.',
        'The player with the higher card wins both cards and adds them to the bottom of their stack.',
        "In case of a tie, a 'war' occurs: each player places three cards face down and reveals the next card. The higher card wins all the cards on the table.",
        'The game continues until one player has all the cards or until players decide to stop.',
      ],
    },
    // CARROM ADDED
    {
      src: CARROM,
      title: 'Carrom',
      description:
        'A popular tabletop game where players use a striker to pocket pieces into four corner pockets.',
      instructions: [
        'Players take turns flicking the striker to pocket carrom men (game pieces) into the corner pockets.',
        'Each player aims to score points by pocketing their assigned pieces (black or white) and the queen piece.',
        'The queen is the red piece, and it must be followed by another pocketed piece to be claimed.',
        'The game continues until all pieces are pocketed, and the player with the highest score wins.',
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full mt-10 md:mt-0 dark:bg-black dark:text-white">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container mx-auto space-y-10 xl:space-y-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover Our Boardgame Collection
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our diverse selection of captivating boardgames,
                  perfect for game nights, family gatherings, and strategic
                  adventures.
                </p>
              </div>
            </div>
            <Splide
              options={{
                type: 'loop',
                perPage: 1,
                autoplay: true,
                lazyLoad: 'sequential',
                autoScroll: {
                  speed: 0.2,
                  pauseOnHover: true,
                },
              }}
              className="mx-auto w-full rounded-t-xl object-cover object-center shadow-2xl"
            >
              <SplideSlide>
                <LazyLoadImage
                  alt="bg"
                  effect="blur"
                  src="https://images.unsplash.com/photo-1656686631034-e88d4fbde1e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover w-full"
                  style={{ height: '500px', width: '2000px' }}
                />
              </SplideSlide>
              <SplideSlide>
                <LazyLoadImage
                  alt="bg1"
                  effect="blur"
                  src="https://images.unsplash.com/photo-1681402720847-961bb1aab8d8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover w-full"
                  style={{ height: '500px', width: '2000px' }}
                />
              </SplideSlide>
              <SplideSlide>
                <LazyLoadImage
                  alt="bg2"
                  effect="blur"
                  src="https://images.unsplash.com/photo-1609818698346-8cb3be6e0bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover"
                  style={{ height: '500px', width: '2000px' }}
                />
              </SplideSlide>
              <SplideSlide>
                <LazyLoadImage
                  alt="bg3"
                  effect="blur"
                  src="https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover"
                  style={{ height: '500px', width: '2000px' }}
                />
              </SplideSlide>
              {/* Add more slides as necessary */}
            </Splide>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
            {boards.map((board, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 card border border-white bg-amber-100 dark:bg-amber-800"
              >
                <div className="relative overflow-hidden dark:bg-amber-800">
                  <img
                    src={board.src}
                    alt={board.title}
                    loading="lazy"
                    width="500"
                    height="400"
                    className="object-cover w-full h-48 transition-all duration-300 ease-in-out group-hover:h-32"
                    style={{ aspectRatio: '500 / 400', objectFit: 'cover' }}
                  />
                  <div className="p-4 bg-background transition-transform duration-300 ease-in-out transform translate-y-0 group-hover:translate-y-4 dark:bg-amber-800">
                    <h3 className="text-xl font-bold">{board.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {board.description}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleOpenInstructions(board)}
                        className="px-4 py-2 text-white bg-green-500 rounded-lg opacity-0 transition-opacity duration-700 delay-300 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        See Instructions
                      </button>
                      <button
                        onClick={() => handleInstantPlay(board)}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg opacity-0 transition-opacity duration-700 delay-300 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Instant Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-6">
              Stay updated with our latest boardgame collections, special
              offers, and events. Subscribe now and never miss out!
            </p>
            <form
              className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                className="px-4 py-2 rounded-lg dark:text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                required
              />
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {selectedBoard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              id="modal-instructions"
              className="bg-amber-100 dark:bg-amber-600 p-8 rounded-lg max-w-md mx-auto shadow-lg relative overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedBoard.title} Instructions
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm mb-4">
                {selectedBoard.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ul>
              <button
                onClick={handleCloseInstructions}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
