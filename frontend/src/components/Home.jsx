import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
/* eslint-disable react/no-unescaped-entities */
export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col  min-h-[90vh] mx-auto max-w-5xl">
      <h1 className="font-prompt text-5xl font-bold">
        Elena<span className="text-3xl text-color2">AI</span>{" "}
      </h1>
      <p className="font-prompt text-xl text-color1 px-5 ">
        Welcome to the future of AI interaction with Elena, your new intelligent
        voice assistant! Designed to streamline your tasks and enhance your
        daily life, Elena is here to make your digital experience more efficient
        and enjoyable. Let's discover what makes Elena the hero of voice
        assistants.
      </p>
      <SpeechRecognitionComponent />
      {/* Pass the csrfToken as a prop */}
    </div>
  );
}
