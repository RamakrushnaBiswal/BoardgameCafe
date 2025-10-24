import { useState, useEffect } from 'react';
import coffee from '../../../../assets/Menu_assets/coffee.png';

const FirstPage = () => {
  const [dimensions, setDimensions] = useState({ width: 600, height: 700 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setDimensions({ width: 300, height: 350 });
      } else {
        setDimensions({ width: 600, height: 700 });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-full">
      <main className="h-full w-full bg-secondary page-shadow md:p-10 p-4">
        <div className="space-y-0 md:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-6xl font-bold text-black/80">
              Coffee Menu
            </h1>
            <p className="text-black/75 text-xs md:text-[16px]">
              Discover our delightful coffee selections.
            </p>
          </div>

          <div className="p-1 flex flex-row md:gap-16 gap-10">
            {/* Coffee items */}
            <div className="md:space-y-2 w-1/2 space-y-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="md:text-xl text-xs font-semibold">Coffee</h2>
                  <p className="md:text-[16px] text-xs">
                    $4.75 (Hot) / $5.25 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">Latte</h2>
                  <p className="md:text-[16px] text-xs">
                    $4.75 (Hot) / $5.25 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="md:text-xl text-xs font-semibold">Cortado</h2>
                  <p className="md:text-[16px] text-xs">
                    $4.25 (Hot) / $4.75 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">
                    Drip Coffee - Small
                  </h2>
                  <p className="md:text-[16px] text-xs">
                    $3 (Hot) / $3.50 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">
                    Drip Coffee - Medium
                  </h2>
                  <p className="md:text-[16px] text-xs">$3.50 (Hot)</p>
                </div>
              </div>

              <div className="hidden md:flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">
                    Drip Coffee - Large
                  </h2>
                  <p className="md:text-[16px] text-xs">
                    $4 (Hot) / $4.25 (Cold)
                  </p>
                </div>
              </div>

              <div className="hidden md:flex  justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">
                    Cafe au Lait
                  </h2>
                  <p className="md:text-[16px] text-xs">$3.25 (Hot)</p>
                </div>
              </div>

              <div className="hidden md:flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">
                    Cappuccino
                  </h2>
                  <p className="md:text-[16px] text-xs">$4.50 (Hot)</p>
                </div>
              </div>
            </div>

            <div className="space-y-0 md:space-y-2 w-1/2">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xs md:text-xl font-semibold">Mocha</h2>
                  <p className="md:text-[16px] text-xs text-black/75">
                    $5.75 (Hot) / $6.25 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="md:text-xl text-xs font-semibold">Red Eye</h2>
                  <p className="md:text-[16px] text-xs">
                    $4.50 (Hot) / $4.75 (Cold)
                  </p>
                  <p className="text-black/75 md:text-[16px] text-xs">
                    Drip coffee with a shot of espresso
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h2 className="md:text-xl text-xs font-semibold">
                    Americano
                  </h2>
                  <p className="md:text-[16px] text-xs">
                    $3.75 (Hot) / $4.25 (Cold)
                  </p>
                </div>
              </div>

              <div className="flex justify-center -space-x-36">
                <img
                  src={coffee}
                  className="h-50 w-50 "
                  alt="Coffee"
                  loading="lazy"
                />
                <img
                  src={coffee}
                  className="h-50 w-50 transform scale-110"
                  alt="Coffee"
                  loading="lazy"
                />
                <img
                  src={coffee}
                  className="h-50 w-50"
                  alt="Coffee"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FirstPage;
