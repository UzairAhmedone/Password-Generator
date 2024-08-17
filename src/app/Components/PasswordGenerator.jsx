"use client";
import React, { useState, useRef } from "react";
let defaultLength = 8;
let defaultNumberAllowed = false;
let defaultSpecialCharAllowed = false;
function generatePassword(length, isNumberAllowed, isSpecialCharAllowed) {
  let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let specialCharacters = "!@#$%^&*()";
  let numbers = "0123456789";
  let passwordString = alphabets;
  if (isNumberAllowed) {
    passwordString += numbers;
  }
  if (isSpecialCharAllowed) {
    passwordString += specialCharacters;
  }
  let password = "";
  for (let index = 0; index < length; index++) {
    password += passwordString.charAt(
      Math.round(Math.random() * passwordString.length),
    );
  }
  return password;
}
const handleChange = (event, setLength) => {
  const newLength = event.target.value; // Get the new length from the input
  setLength(newLength); // Update the state with the new length
};

export const PasswordGenerator = () => {
  const [length, setLength] = useState(defaultLength);
  const [isNumberAllowed, setNumberAllowed] = useState(defaultNumberAllowed);
  const [isSpecialCharAllowed, setSpecialCharAllowed] = useState(
    defaultSpecialCharAllowed,
  );
  const elementRef = useRef(null);
  const handleCopy = () => {
    const textElement = elementRef.current;
    if (textElement) {
      textElement.select();
      if (navigator) {
        elementRef.current.focus();
        navigator.clipboard.writeText(currentPassword);
      } else {
        document.execCommand("copy"); // Copy the text to clipboard
      }
    }
  };
  let currentPassword = generatePassword(
    length,
    isNumberAllowed,
    isSpecialCharAllowed,
  );

  return (
    <div className="container text-gray-300 rounded mx-auto bg-gray-600">
      <div className="flex h-10 justify-center align-middle mx-auto mt-7">
        <input
          className="text-black h-full m-0 p-0 w-4/5 rounded outline-none"
          ref={elementRef}
          type="text"
          value={currentPassword}
          name=""
          id=""
        />
        <button
          onClick={handleCopy}
          className="bg-blue-950 m-0 p-0 h-full rounded">
          Copy
        </button>
      </div>
      <div className="flex mx-10 justify-center">
        <div className="form-input flex align-middle">
          <label htmlFor="">Length</label>
          <input
            type="range"
            onChange={(event) => handleChange(event, setLength)}
            maxLength="100"
            value={length}
          />
        </div>
        <div className="form-input flex align-middle">
          <label htmlFor="">Numbers</label>
          <input
            type="checkbox"
            onChange={() => {
              setNumberAllowed(!isNumberAllowed);
            }}
            name=""
            id=""
          />
        </div>
        <div className="form-input flex align-middle">
          <label htmlFor="">Special Characters</label>
          <input
            type="checkbox"
            onChange={() => {
              setSpecialCharAllowed(!isSpecialCharAllowed);
            }}
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};
