import React from "react";
import { AppBar, Box, ButtonBase, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [lastPressed, setLastPressed] = useState("");
  const [display, setDisplay] = useState("⏳");

  useEffect(() => {
    const handleKeyDown = (event) => {
      pressButton(event.key.toUpperCase());
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!lastPressed) {
      return;
    }
     const audioEl = document.getElementById(lastPressed);
    if (!audioEl) {
      return;
    }
    var playPromise = audioEl.play();
    if (playPromise) {
      playPromise
        .then(_ => audioEl.onended = () => {audioEl.pause(); setLastPressed("");})
        .catch(e => console.log(`Audio play error: ${e}`))
    }
  }, [lastPressed]);

  const pressButton = (key) => {
    const description = images.find((image) => image.title === key)?.description || "⏳";
    setDisplay(description);
    const audioEl = document.getElementById(lastPressed);
    setLastPressed(key.toUpperCase());
  };

  const images = [
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "Q",
      description: "Heater-1",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "W",
      description: "Heater-2",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "E",
      description: "Heater-3",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "A",
      description: "Heater-4",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "S",
      description: "Clap",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "D",
      description: "Open-HH",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "Z",
      description: "Kick-n'-Hat",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "X",
      description: "Kick",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3`,
    },
    {
      url: `${process.env.PUBLIC_URL}/assets/drum_image.png`,
      title: "C",
      description: "Closed-HH",
      audio: `https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3`,
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <Box className="App">
      <header className="App-header">
        <AppBar>
          <Typography variant="h3" id="title">
            ✨🥁
            <span id="display" style={{ display: "inline" }}>
              {display}
            </span>
            🥁✨
          </Typography>
        </AppBar>
        <Box id="drum-machine">
          <Box id="display">
            {images.map((image) => (
              <ImageButton
                id={`button-${image.title}`}
                className="drum-pad"
                key={image.title}
                style={{
                  width: "calc(min(calc(100vh - 64px), 100vw)/3)",
                  height: "calc(min(calc(100vh - 64px), 100vw)/3)",
                  filter:
                    lastPressed === image.title
                      ? "brightness(1.8)"
                      : "brightness(1)",
                }}
                onClick={() => pressButton(image.title)}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
                <audio className="clip" id={image.title} src={image.audio}>
                  <source src={image.audio} type="audio/mpeg" />
                </audio>
              </ImageButton>
            ))}
          </Box>
        </Box>
      </header>
    </Box>
  );
}

export default App;
