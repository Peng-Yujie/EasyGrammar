import React, { useState, useEffect } from "react";
import fixPic from "../img/fixPic.jpeg";
import { Link } from "react-router-dom";

export default function ImageUnite({ data }) {
  // check if error exists
  const error = data[0]?.error;
  // get searched word for alt attribute
  const word = error ? "" : data[0]?.word;

  // Initialize state
  const [imageData, setImageData] = useState({});

// <<<<<<< GrammarChecker
//   //useState will be use to update the image
//   const [image_url, setImage_url] = useState("");
//   const [text, setText] = useState("");
//   const [spellCheckedText, setSpellCheckedText] = useState("")

  // Update state with stored data when word changes
  useEffect(() => {
    const localData = localStorage.getItem(word);
    if (localData) {
      const localJsonData = JSON.parse(localData);
      setImageData(localJsonData);
    } else {
      setImageData({
        word,
        image_url: "",
        showGenerate: true,
        isGenerated: false,
      });
    }
  }, [word]);

  // Store state in local storage when it changes
  useEffect(() => {
    if (imageData.word) {
      localStorage.setItem(imageData.word, JSON.stringify(imageData));
    }
  }, [imageData]);

  const meanings = [];
  const examples = [];
  if (error === undefined) {
    // Going through the dictionary API to get first one definition
    data.slice(0, 1).forEach((element) =>
      element.meanings.forEach((set) => {
        set.definitions.slice(0, 1).forEach((definition) => {
          meanings.push(definition.definition);
        });
        set.definitions.forEach((definition) => {
          examples.push(definition.example);
        });
      })
    );
  }
  const meaningsStr =
    meanings.length > 0
      ? "The word can mean " + meanings.join(", ") + " and so on. "
      : "";
  const examplesStr =
    examples.length > 0
      ? "In a sentence, it could be used like " +
        examples.join(", ") +
        " and so on. "
      : "";
  // eslint-disable-next-line
  const prompt = `Generate an image representing the word '${word}' along with its meanings and potential context. ${meaningsStr}${examplesStr}Create an image that encapsulates the essence of this word in a visually compelling manner.`;

  // funtion that will be generated when we click on the button
  const imageGenerator = async () => {
    // this mean that if we don't add anything in the input field, it won't return anything
    if (error || !word) {
      return 0;
    }
    // const response = await fetch(
    //   "https://api.openai.com/v1/images/generations",
    //   {
    //     // using POST to make a request to the server
    //     method: "POST",
    //     headers: {
    //       "content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //       "User-agent": "Chrome",
    //     },
    //     body: JSON.stringify({
    //       // this will give the text return in the input field
    //       prompt: prompt,
    //       // 1 because we want only one image
    //       n: 1,
    //       size: "512x512",
    //     }),
    //   }
    // );
    // Fake data for testing
    const response = {
      json: async () => ({
        data: [
          {
            url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-uB1j9FGy5Rm2ISNYwywKauFE/user-KHCquEXdmLmLn6XiJnygDWCz/img-0dkKCN3bb5GGcbJem3MyLMLT.png?st=2024-03-27T20%3A38%3A14Z&se=2024-03-27T22%3A38%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-27T17%3A39%3A48Z&ske=2024-03-28T17%3A39%3A48Z&sks=b&skv=2021-08-06&sig=loOZyo6qpWs0Doa/uFzuO2TQ6b4rcJ/1Jz5Yq4JSsRs%3D",
          },
        ],
      }),
    };

    // return a promise, the data from the response body is stored in the variable data
    let res = await response.json();
    // // get the data property from the data object
    let res_data = res.data;
    // console.log(data);
// <<<<<<< GrammarChecker
//   };
  
//   // grammar checker start here 
//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };

//     const AIspellCheck = async () => {
       
//         const response2 = await fetch(
//           "https://api.openai.com/v1/chat/completions",
//           {
//             // using POST to make a request to the server
//             method: "POST",
//             headers: {
//               "content-Type": "application/json",
//               Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            
//             },
//             body: JSON.stringify({
//               model: "gpt-3.5-turbo",
//               messages: [
//                 {
//                     role:'system',
//                     content: "you are a helful assistant who can correct spelling, grammatical and lexical errors"
//                 },
//                 {
//                     role:'user',
//                     content: `correct the spelling,grammatical and lexical errors in this text: ${text}`
//                 },
//               ],
//               temperature: 0.7,
//               max_tokens:64,
//               top_p: 1
              

//             }),
//           }
        
//         );
    
//         let data2 = await response2.json();
//         console.log(data2)
//         let data2_array = data2.choices;
//         setSpellCheckedText(data2_array[0].message.content);
        

        

//   }

//   return (
//     <>
//       {/* using a ternary operator if image_url is true we show the default image if false we show the image provided by the OpenAI api */}
//       <div>
//         <img src={image_url === "" ? fixPic : image_url} alt="" />
//       </div>
//       <p>here is the image test</p>
//       <input
//         type="text"
//         ref={inputRef}
//         placeholder="describe what you want to see"
//       />
//       <button
//         onClick={() => {
//           imageGenerator();
//         }}
//       >
//         Generate
//       </button>

//     {/* grammar checker start here  */}
//       <div>
//         <textarea 
//             placeholder="describe the image here" 
//             cols={80} 
//             rows={15} 
//             value={text}
//             onChange={handleTextChange}
//         />
//       </div>

//       <div>
//       <button
//         onClick={() => {
//             AIspellCheck();
//         }}
//       >
//         check
//       </button>
//       </div>
//       <h3>{spellCheckedText}</h3>
//     </>
// =======
    if (res_data[0].url) {
      setImageData({
        word,
        image_url: res_data[0].url,
        showGenerate: false,
        isGenerated: true,
      });
    }
  };

  return (
    !error && (
      <>
        {/* using a ternary operator if image_url is true we show the default image if false we show the image provided by the OpenAI api */}
        <img src={imageData.image_url || fixPic} alt={word} />
        {imageData.showGenerate && (
          <>
            <div>
              Create an image of&nbsp;
              <code>{word}</code>
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                imageGenerator();
              }}
            >
              Generate
            </button>
          </>
        )}
        {imageData.isGenerated && (
          <button className="btn-primary">
            <Link to="/practice">Practice</Link>
          </button>
        )}
      </>
    )
  );
}
