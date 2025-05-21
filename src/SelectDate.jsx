import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./GlobalContext";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { createEvent } from "ics";
import dayjs from "dayjs";



const SelectDate = () => {
  const navigate = useNavigate();
  const { backgroundImageUrl, toggleMute, isMuted } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [storedDate, setStoredDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null)

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      alert(`Date: ${selectedDate.format("DD-MM-YYYY")}\nTime: ${selectedTime.format("hh:mm A")}`);
      handleICSDownload(); // Trigger ICS download after valid selection
    } else {
      alert("Please select both date and time.");
    }
  };

  // ICS File Download
  const handleICSDownload = () => {
    const date = selectedDate.toDate();
    const time = selectedTime.toDate();

    const eventStart = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    ];

    const event = {
      start: eventStart,
      duration: { hours: 2 },
      title: "Date with My Pookie 💖",
      description: "A lovely time awaits!",
      location: "Your Favourite Place",
      status: "CONFIRMED",
      busyStatus: "BUSY",
      organizer: { name: "Huzefa", email: "huzefa9246@gmail.com" },
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.error("ICS creation failed:", error);
        alert("Something went wrong generating the calendar file.");
        return;
      }

      const blob = new Blob([value], { type: "text/calendar" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "date-invite.ics";
      link.click();
    });
  };
  return (
    <>
      {/* Background */}
      <div
        className="h-screen w-full bg-cover bg-center absolute -z-10"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 text-white">
        <h1 className="text-5xl font-bold text-pink-500 animate-flash mb-4 ">
          Select a Date
        </h1>
        <div className="bg-white bg-opacity-20 space-x-5">
          <DatePicker
            label="Select a Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: "4px",
                  "& .MuiInputLabel-root": { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FE5D9F",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F686BD",
                    },
                  },
                }}
              />
            )}
          />
          <DesktopTimePicker
            value={selectedTime}
            onChange={(newValue) => {
              setSelectedTime(newValue)
            }}
            defaultValue={dayjs('2022-04-17T15:30')} />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
        {/* Mute Status Display */}
        <div className="text-white mt-4">
          {isMuted ? "🔇 Audio is Muted (Press 'M' to Unmute)" : "🔊 Audio is Playing (Press 'M' to Mute)"}
        </div>

      </div>
    </>
  );
}
export default SelectDate;