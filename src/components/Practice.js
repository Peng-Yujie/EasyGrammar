import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fixPic from "../img/fixPic.jpeg";

// Please define the props for this component
export default function Practice({ onUserInput, data }) {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  // Here for the toggle buttons of the help section
  const [isOpen, setIsOpen] = useState([false, false]);
  // Get the word from the data
  const word = data[0]?.error ? "" : data[0]?.word;
  // Get img url from local storage
  let image_url = fixPic;
  const imageData = localStorage.getItem(word);
  if (imageData) {
    const localJsonData = JSON.parse(imageData);
    image_url = localJsonData.image_url;
  }
  // Here for the key words and example sentence, please replace the following with the data in props
  const helpInfo = [
    {
      title: "Key Words",
      content: "Here are some key words that you can use in your sentence:",
    },
    {
      title: "Example Sentence",
      content:
        "Here is an example sentence that you can use as a reference for your answer:",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    onUserInput(userInput);
    navigate("/home/feedback");
  };

  const toggleOpen = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <section className="block w-full">
      <div className="mt-12 mx-4 md:mx-auto max-w-4xl">
        <div>
          <h2 className="font-bold text-xl lg:text-2xl">
            Write one or more sentences that&nbsp;
            <span className="text-gradient">describe this picture</span>
          </h2>
          {/* Here for AI generated image */}
          <div className="mt-4 max-w-lg mx-auto bg-white rounded-2xl p-4">
            <img
              src={image_url || fixPic}
              alt="AI-Generated"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="mt-8">
          <Link to="/home" className="btn-primary">
            Back to Search
          </Link>
          <h3 className="font-bold text-left text-lg lg:text-xl mb-2">
            Your Answer:
          </h3>
          {/* Here for User input */}
          <form className="w-full" onSubmit={handleInputSubmit}>
            <div className="relative">
              <textarea
                value={userInput}
                onChange={handleInputChange}
                type="search"
                id="word-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write one or more sentences that describe the above picture."
                rows={6}
                required
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 btn-primary"
                title="Submit to get feedback from OpenAI"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8">
          <h3 className="font-bold text-left text-lg lg:text-xl mb-2">
            Need Help?
          </h3>
          <div className="rounded-lg border border-gray-300 bg-purple-100 shadow-md">
            {helpInfo.map((info, index) => (
              <div key={info.title}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleOpen(index)}
                    className={`flex items-center justify-between w-full p-4 rtl:text-right ${
                      index === 1 ? "border-t border-gray-300" : ""
                    }`}
                  >
                    <span className="font-semibold">{info.title}</span>
                    <svg
                      className={`w-3 h-3 shrink-0 ${
                        isOpen[index] ? "" : "rotate-180"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="#d1d5db"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h3>
                <div
                  className={`p-5 border-t border-gray-300 bg-purple-50 overflow-hidden
                ${isOpen[index] ? "" : "hidden"}
                ${index === 1 ? "rounded-b-lg" : ""}`}
                >
                  <p className="mx-4 mb-2 text-left text-gray-500 dark:text-gray-400">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
