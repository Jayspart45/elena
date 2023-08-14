/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SpeechRecognitionComponent = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const transcriptRef = useRef("");
  const microphoneRef = useRef(null);
  const[responseData,setResponseData] = useState("")

  const handleListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  useEffect(() => {
    if (transcript !== "" && transcript !== transcriptRef.current) {
      console.log(transcript);
      transcriptRef.current = transcript;

      const formData = new FormData();
      formData.append("data", transcript);

      axios
        .post("/recognize_and_speak/", formData)
        .then((response) => {
          setResponseData(response.message)
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [transcript]);

  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    transcriptRef.current = "";

    resetTranscript();
  };

  return !SpeechRecognition.browserSupportsSpeechRecognition() ? (
    <div>Browser does not support Speech Recognition.</div>
  ) : (
    <>
      <div ref={microphoneRef} onClick={handleListening}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 p-2 my-5 rounded bg-color3 mx-auto shadow-lg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </div>
      <div className="max-w-sm flex items-center justify-center flex-col  text-2xl font-beba text-black space-y-5">
        <p className="text-center  col-span-2 w-full">
          {isListening ? "Listening........." : "Ask Elena"}
        </p>
        <button
          className={` ${
            isListening ? "" : "cursor-not-allowed"
          } shadow-lg text-2xl  px-4 py-2 rounded  font-beba text-black bg-color2`}
          onClick={stopHandle}
        >
          Stop
        </button>
      </div>

      <div>{responseData}</div>
    </>
  );
};

export default SpeechRecognitionComponent;
