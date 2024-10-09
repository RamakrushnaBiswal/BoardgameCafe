import HTMLFlipBook from "react-pageflip";
import Page from "./Pages.jsx";
import Cover from "./MenuPages.jsx/Cover/Cover.jsx";
import coverImg from "../../assets/Menu_assets/cover.png";
import FirstPage from "./MenuPages.jsx/Coffee/FirstPage.jsx";
import BgTexture from "../../assets/Menu_assets/bg-texture.png";
import SecondPage from "./MenuPages.jsx/Drinks/SecondPage.jsx";
import ThirdPage from "./MenuPages.jsx/Boba/ThirdPage.jsx";
import FourthPage from "./MenuPages.jsx/HotBite/FourthPage.jsx";
import FifthPage from "./MenuPages.jsx/Sandwhiches/FivthPage.jsx";
import SixthPage from "./MenuPages.jsx/Seasonal/SixthPage.jsx";
import SeventhPage from "./MenuPages.jsx/Beer&Wines/SeventhPage.jsx";
import { useState, useEffect } from 'react';
import ThankPage from "./MenuPages.jsx/ThankPage/ThankPage.jsx";

// Import other components and assets as before

const BgTextureStyle = {
  backgroundImage: `url(${BgTexture})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  width: "100%",
};

function MyBook() {
  const [dimensions, setDimensions] = useState({ width: 600, height: 700 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) { 
        setDimensions({ width: 300, height: 350 });
      } else {
        setDimensions({ width: 600, height: 650 }); 
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={BgTextureStyle} className=" mt-2 mb-20 overflow-hidden w-full h-full flex justify-center items-center ">
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        showCover="true"
      >
        <Page number={1}>
          <Cover coverImg={coverImg} />
        </Page>
        <Page number={2}>
          <FirstPage />
        </Page>
        <Page number={3}>
          <SecondPage />
        </Page>
        <Page number={4}>
          <ThirdPage />
        </Page>
        <Page number={5}>
          <FourthPage />
        </Page>
        <Page number={6}>
          <FifthPage />
        </Page>
        <Page number={7}>
          <SixthPage />
        </Page>
        <Page number={8}>
          <SeventhPage />
        </Page>
        <Page number={9}>
          <ThankPage/>
        </Page>
        <Page number={10}>
          <Cover coverImg={coverImg}  />
        </Page>
      </HTMLFlipBook>
    </div>
  );
}

export default MyBook;
