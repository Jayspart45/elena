/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import regeneratorRuntime from "regenerator-runtime";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [responseData, setResponseData] = useState("Data is shown here");
  const [transcript, setTranscript] = useState(""); // Updated state for transcript
  const [loadings, setLoadings] = useState(false);
  const handleListening = () => {
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition(); // Using the Web Speech API
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
    };

    recognition.start();
  };

  useEffect(() => {
    if (transcript !== "") {
      console.log(transcript);

      // Send transcript to the server for processing
      const formData = new FormData();
      formData.append("data", transcript);
      setLoadings(true);
      axios
        .post("/recognize_and_speak/", formData)
        .then((response) => {
          setResponseData(response.data.message);
          setLoadings(false);
          handleListening();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [transcript]);

  const stopHandle = () => {
    setIsListening(false);
    setLoadings(false);
    axios.post("/stopAi/").then((res) => console.log(res));
    // setTranscript("");
  };

  return (
    <>
      <div onClick={handleListening}>
        {/* Your microphone SVG code */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 p-2 my-5 rounded-full hover:outline-dotted outline-color2 bg-color3 mx-auto shadow-lg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </div>
      {/* Other UI elements */}
      <div className="max-w-sm flex items-center justify-center flex-col  text-2xl font-beba text-black space-y-5">
        {isListening ? (
          <div className="flex space-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-color1 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
            <button
              className="text-2xl p-2  rounded-sm font-beba text-red-500 "
              onClick={stopHandle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 fill-red-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                />
              </svg>
            </button>
          </div>
        ) : (
          "Ask Elena"
        )}
      </div>
      {transcript ? (
        <div className="text-xl text-color1 font-beba p-5 bg-color4">
          {transcript}
        </div>
      ) : (
        <></>
      )}
      {loadings ? (
        <div className="flex items-center space-x-2 mt-2">
          <div className="text-color2 font-beba text-xl">Loading</div>
          <span className="animate-spin ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
        </div>
      ) : (
        <div className="mb-5 flex justify-center items-center flex-col max-w-sm bg-slate-200 p-2 px-4 mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <div className="text-lg font-beba">{responseData}</div>
        </div>
      )}
    </>
  );
};

export default SpeechRecognitionComponent;
