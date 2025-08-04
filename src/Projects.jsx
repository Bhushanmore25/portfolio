import React from "react";
import InfiniteMenu from "./InfiniteMenu";
const Projects = () => {
  const items = [
    {
      image: "Streamify.png",
      link: "https://github.com/Bhushanmore25/Streamify",
      title: "Streamify",
      description: "Music streaming platform",
    },
    {
      image: "Drive.png",
      link: "https://github.com/Bhushanmore25/imageUploadandAccess",
      title: "Drive",
      description: "Cloud storage system",
    },
    {
      image: "Doping_Intel.png",
      link: "https://github.com/Bhushanmore25/Doping_Intel",
      title: "Doping Intel",
      description: "AI sports analytics",
    },
    {
      image: "ycceDash.png",
      link: "https://github.com/Piyush22070/ycce-dashboard",
      title: "YCCE Dashboard",
      description: "College management system",
    },
    {
      image: "Concept_To_Create.png",
      link: "https://github.com/Bhushanmore25/AI-powered-Personalized-Project-Generator",
      title: "Concept To Create",
      description: "AI project generator",
    },
    {
      image: "chronicdisease.png",
      link: "https://github.com/Bhushanmore25/Chronic-Diseases",
      title: "Chronic Disease",
      description: "Healthcare monitoring",
    },
    {
      image: "ExtraCurricular.png",
      link: "https://github.com/Bhushanmore25/ExtraCurricular_Event_tracking-",
      title: "Event Tracker",
      description: "Event management system",
    },
    {
      image: "MultiUtil.png",
      link: "https://github.com/GTcoder27/Video_Transcriptor_and_Translator",
      title: "MultiUtil",
      description: "Video transcription tool",
    },
    {
      image: "passmanager.png",
      link: "https://github.com/Bhushanmore25/Password-Manager-and-Generator",
      title: "PassManager",
      description: "Password manager",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-yellow-600">Projects</h1>
      <div style={{ height: "90vh", position: "relative" }} className="rounded-lg overflow-hidden text-white">
        <InfiniteMenu items={items} />
      </div>
    </div>
  );
};

export default Projects;
