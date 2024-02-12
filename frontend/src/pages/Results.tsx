// src/pages/Resluts.tsx
import { ISourceOptions } from "@tsparticles/engine";
import axios from "axios";
import { ParticlesBackground } from "components/ParticlesBackground";
import SmokeEffect from "components/SmokeEffect";
import SideConfetti from "components/options/SideConfetti.json";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "utils/types";

const Resluts: React.FC = () => {
  const { storyId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}contents?story=${storyId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching Messages:", error);
        alert("Failed to List Messages. Please try again.");
      }
    };

    fetchMessages();
  }, [storyId]);
  return (
    <>
      {/* <div className="flex justify-center items-center absolute inset-0 text-center"> */}
      <ParticlesBackground options={SideConfetti as ISourceOptions} />
      <SmokeEffect />
      <div
        className="nav dark:bg-[#00000080] bg-[#ffffff90] shadow-xl text-center flex flex-col w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto mt-5 dark:text-white"
        style={{ height: "calc(100vh - 144px)" }}
      >
        <div className="border-b border-solid border-gray-300 dark:border-gray-400 rounded-t">
          <h2 className="text-2xl font-bold p-3">
            Congratulations on completing the captivating journey of our
            one-line story game!
          </h2>
        </div>
        <div className="overflow-y-auto">
          <p className="p-3">
            Your choices and imagination have woven a unique tale, making you a
            true master of this narrative adventure. Well done storytellers!
          </p>
          <p className="px-3 pb-3">Here is your final story</p>
          <p className="text-2xl text-justify px-8 pb-3 flex-1">
            {messages.map((message) => (
              <span key={message._id}>{message.content} </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Resluts;
