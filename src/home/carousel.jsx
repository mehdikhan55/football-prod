import React, { useEffect, useState } from "react";
import logo1 from "../assets/homeLogos/1.png";
import logo2 from "../assets/homeLogos/2.png";
import logo3 from "../assets/homeLogos/3.png";
import logo4 from "../assets/homeLogos/4.png";
import logo5 from "../assets/homeLogos/5.png";
import logo6 from "../assets/homeLogos/6.png";
import logo7 from "../assets/homeLogos/7.png";
import logo8 from "../assets/homeLogos/8.png";
import logo9 from "../assets/homeLogos/9.png";

const LogoCarousel = () => {
  const [position, setPosition] = useState(0);

  // In your actual implementation, replace these with your imported logos
  const logos = [
    { src: logo1, alt: "Logo 1" },
    { src: logo2, alt: "Logo 2" },
    { src: logo3, alt: "Logo 3" },
    { src: logo4, alt: "Logo 4" },
    { src: logo5, alt: "Logo 5" },
    { src: logo6, alt: "Logo 6" },
    { src: logo7, alt: "Logo 7" },
    { src: logo8, alt: "Logo 8" },
    { src: logo9, alt: "Logo 9" },
  ];

  // Duplicate logos to create seamless infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev - 1;
        // Reset position when we've scrolled through all original logos
        if (Math.abs(newPosition) >= logos.length * 100) {
          return 0;
        }
        return newPosition;
      });
    }, 30);

    return () => clearInterval(slideInterval);
  }, [logos.length]);

  return (
    <div className="w-full bg-transparent py-8 overflow-hidden">
      <div className=" mx-auto px-4">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex items-center transition-transform duration-300"
            style={{
              transform: `translateX(${position}px)`,
              width: `${duplicatedLogos.length * 200}px`,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-24 mx-4 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
