"use client";

import React, { useState } from "react";

function Home() {
  const [outputString, setOutputString] = useState("");

  const handleTileClick = (letter: string) => {
    setOutputString((prevString) => {
      const newString = prevString + letter;
      const consecutiveMatches = newString.match(/(.)\1{2,}/g);

      if (consecutiveMatches) {
        return consecutiveMatches.reduce((acc, match) => {
          return acc.replace(
            match,
            match.length === 3 ? "_" : "_".repeat(match.length)
          );
        }, newString);
      }

      return newString;
    });
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="container px-5 2xl:px-56 py-10 mx-auto">
      <h1 className="font-bold text-4xl pb-10">Alphabet Tiles</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full h-full">
        {alphabet.split("").map((letter) => (
          <button
            className="border px-2 py-2"
            key={letter}
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <p className="pt-8 font-semibold text-lg">
        Output String:{" "}
        <span className="font-medium " id="outputString">
          {outputString}
        </span>
      </p>
    </div>
  );
}

export default Home;
