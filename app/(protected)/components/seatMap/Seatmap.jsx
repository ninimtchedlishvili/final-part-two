"use client";
import React, { useState } from "react";
import calendar from "../util/calendar";

const Seatmap = () => {
  const [selectedSeat, setSelectedSeat] = useState(false);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const rows = 5;
  const columns = 10;

  const handleDayChange = (e) => {
    setWeekDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleBookSeat = (seatNumber) => {
    setSelectedSeat(true);
    // if (
    //   calendar
    //     .flatMap((item) => item.sessions)
    //     .find(
    //       (session) =>
    //         session.time === time && session.occupiedSeats.includes(seatNumber)
    //     )
    // ) {
    //   alert(`Seat ${seatNumber} is occupied!`);
    // } else {
      if (!bookedSeat.includes(seatNumber)) {
        if (bookedSeat.length < 6) {
          setBookedSeat((prevBookedSeats) => [...prevBookedSeats, seatNumber]);
        } else {
          alert("You can only buy 6 tickets at a time");
        }
      } else {
        setBookedSeat((prevBookedSeats) =>
          prevBookedSeats.filter((seat) => seat !== seatNumber)
        );
      // }
    }
  };



  return (
    <div className="flex flex-col md:flex-row justify-center items-start space-y-10 md:space-y-0 md:space-x-10 p-6">
      {/* Left Side: Seat Map */}
      <div className="flex-1 p-6 rounded-lg shadow-lg">
        {/* Seat Map Header */}
        <div className="flex gap-8 items-center mb-6">
          <div className="flex space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-md mb-2 shadow-md"></div>
              <p className="text-sm text-gray-600 font-semibold">Available</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="selected w-10 h-10 bg-yellow-400 rounded-md mb-2 shadow-md"></div>
              <p className="text-sm text-gray-600 font-semibold">Booked</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="occupied w-10 h-10 bg-red-400 rounded-md mb-2 shadow-md"></div>
              <p className="text-sm text-gray-600 font-semibold">Sold</p>
            </div>
          </div>
        </div>

        {/* Day and Session Selection */}
        <div className="flex gap-6 mb-6">
          <select
            className="p-3 border rounded-md w-full md:w-auto"
            onChange={handleDayChange}
          >
            {calendar.map((item) => (
              <option key={item.day} value={item.day}>
                {item.day} {item.date}
              </option>
            ))}
          </select>

          <select
            onChange={handleTimeChange}
            className="p-3 border rounded-md w-full md:w-auto"
          >
            {calendar
              .filter((item) => item.day === weekDay)
              .map((item) =>
                item.sessions.map((session) => (
                  <option key={session.time} value={session.time}>
                    {session.time}
                  </option>
                ))
              )}
          </select>
        </div>

        {/* Seat Map */}
        <div className="text-black space-y-2">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
              {Array.from({ length: columns }, (_, colIndex) => {
                const seatNumber = rowIndex * columns + colIndex + 1;
                return (
                  <button
                    key={seatNumber}
                    onClick={() => handleBookSeat(seatNumber)}
                    className={`w-[50px] h-[50px] flex items-center justify-center rounded-md m-[5px] hover:cursor-pointer hover:bg-gray-500 
                      ${
                        bookedSeat.includes(seatNumber)
                          ? "bg-yellow-300"
                          : "bg-gray-300"
                      } 

                      // {
                      //   calendar
                      //     .filter((item) => item.day === weekDay)
                      //     .flatMap((item) => item.sessions)
                      //     .some(
                      //       (session) =>
                      //         session.time === time &&
                      //         session.occupiedSeats.includes(seatNumber)
                      //     )
                      //      "bg-red-300"
                      //     : ""
                      // } 

                    `}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Booked Seats and Clear Button */}
      <div className="flex flex-col w-full md:w-[200px] bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Booked Seats
          </h3>
          {bookedSeat.length === 0 ? (
            <p className="text-sm text-gray-400">No seats booked yet.</p>
          ) : (
            <ul className="space-y-2 text-white">
              {bookedSeat.map((seatNumber) => (
                <li key={seatNumber} className="flex justify-between">
                  <span>Row: {Math.floor((seatNumber - 1) / columns) + 1}</span>
                  <span>Seat: {seatNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="h-[40px] p-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full"
          onClick={() => {
            setBookedSeat([]);
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};

export default Seatmap;
