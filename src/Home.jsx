import * as React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import "./App.css";
import "./shake.css"; // Import the shake animation
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const { backgroundImageUrl, toggleMute, isMuted } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const defaultGif =
    "https://media.tenor.com/Nbv1SysxlrUAAAAM/heavenly-joy-jerkins-i-am-so-excited.gif";
  const hoverGif =
    "https://media.tenor.com/OroVCOXbuUUAAAAM/sadhamstergirl.gif";

  const [gifSrc, setGifSrc] = useState(defaultGif);

  /**
   * Handle Hover Effect for "No" Button
   */
  const handleNoHover = () => {
    setGifSrc(hoverGif);
  };

  const handleNoLeave = () => {
    setGifSrc(defaultGif);
  };

  /**
   * Handle "No" Button Click - Annoying Dialog
   */
  const handleNoClick = () => {
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      setOpen(true);
    }, 1000);
  };

  /**
   * Handle Dialog Close - Keeps Reopening
   */
  const handleDialogClose = () => {
    alert("You really thought you could say No? 😆");
    setOpen(true);
  };

  /**
   * Handle "Yes" Button Click
   */
  const handleYesClick = () => {
    navigate("/select-a-date");
  };

  return (
    <>
      {/* Background */}
      <div
        className="h-screen w-full bg-cover bg-center absolute -z-10"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center space-y-4 min-h-screen overflow-hidden">
        {/* GIF Container */}
        <div className="border border-white mt-8 gif-container">
          <img src={gifSrc} alt="GIF" className="w-64 h-64 object-cover" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-pink-500 animate-flash">
          Do you want to go on a date?
        </h1>

        {/* Button Container */}
        <div className={`flex space-x-4 ${isShaking ? "shake" : ""}`}>
          <Button
            sx={{
              backgroundColor: "#F686BD",
              "&:hover": {
                backgroundColor: "#FE5D9F",
              },
            }}
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={handleYesClick}
          >
            Yes
          </Button>

          <Button
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onMouseLeave={handleNoLeave}
            sx={{
              backgroundColor: "#F38375",
              "&:hover": {
                backgroundColor: "#EF6351",
              },
            }}
            variant="contained"
            startIcon={<HeartBrokenIcon />}
          >
            No
          </Button>
        </div>

        {/* Dialog */}
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Oh, Come On! 🤨</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Did you just say <strong>No</strong>? That's not an option. 
              Are you sure you don't want to reconsider? 
              Tap "Yes" and make my day! 💖
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleYesClick} color="primary">
              Fine, Yes 🙄
            </Button>

            <Button onClick={handleDialogClose} color="error">
              No (Haha, nice try!)
            </Button>
          </DialogActions>
        </Dialog>

        {/* Mute Status and Toggle Button */}
        <div className="text-white mt-4">
          {isMuted ? "🔇 Audio is Muted (Press 'M' to Unmute)" : "🔊 Audio is Playing (Press 'M' to Mute)"}
        </div>

        {/* <p
          variant="contained"
          color={isMuted ? "secondary" : "primary"}
          onClick={toggleMute}
        >
          {isMuted ? "Unmute 🔈" : "Mute 🔇"}
            </p> */}
      </div>
    </>
  );
}

export default Home;
