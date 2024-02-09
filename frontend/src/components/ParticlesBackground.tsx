import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ISourceOptions, type Container } from "@tsparticles/engine";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useTheme } from "context/ThemeContext";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const ParticlesBackground = ({
  options,
}: {
  options: ISourceOptions;
}) => {
  const [init, setInit] = useState(false);
  const [colors, setColors] = useState<string[]>([
    "#87CEEB",
    "#FFD700",
    "#1E90FF",
    "#4169E1",
  ]);
  const [darkColors, setDarkColors] = useState<string[]>([
    "#000000",
    "#4B0082",
    "#001F3F",
  ]);

  const { theme } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  useEffect(() => {
    // Function to be executed every 5 seconds
    const shuffleArray = (array: string[]) => {
      const newArray = [...array]; // Create a copy of the array to avoid modifying the original
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // Set up the interval
    const intervalId = setInterval(() => {
      if (theme === "dark") {
        setDarkColors((prevColors) => shuffleArray(prevColors));
      } else {
        setColors((prevColors) => shuffleArray(prevColors));
      }
    }, 5000);

    // Clear the interval when leaving the page
    return () => clearInterval(intervalId);
  }, [theme]);

  if (init) {
    return (
      <div
        className={`z-[-1] absolute top-0 left-0 w-full h-full`}
        style={{
          background: `linear-gradient(to bottom, ${
            theme === "dark"
              ? `${darkColors[0]}, ${darkColors[1]}`
              : `${colors[0]}, ${colors[1]}`
          })`,
        }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="fixed"
        />
      </div>
    );
  }

  return <></>;
};
