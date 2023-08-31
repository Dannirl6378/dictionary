import React, { useState } from "react";
import axios from "axios";

interface ApiResponse {
  word: string;
  phonetic: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?:string;
    }[];
  }[];
}

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const getWord = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data[0]); // Můžete získat první prvek z pole, pokud je to pole
        console.log(response.data);
      });
      setWord("");
    }
  };

  return (
    <div className="container">
      <div className="head">
        <div className="bar">
          <h1>Search Bar</h1>
          <p>For dictionary</p>
          <div className="search">
            <input
              value={word}
              onChange={(event) => setWord(event.target.value)}
              onKeyDown={getWord}
              placeholder="Enter word"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="body">
        <div className="word">
          <h1>{data?.word} </h1>
          <h4>{data?.phonetic}</h4>
        </div>
        <div className="definition">
          <p>Definition/Meaning:</p>
          {data?.meanings.map((part) => (
            <div>
              <ul>
                {part.definitions.slice(0, 2).map((definition) => (
                  <li>
                    {definition?.definition}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="example">
          <p>Example:</p>
          {data?.meanings.map((part) => (
            <div>
              <ul>
                {part.definitions.slice(0, 2).map((definition) => (
                  <li>
                     {definition.example && definition.example.length > 0
              ? definition.example
              : "-"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="synonym">
          <p>Synonym:</p>
          {data?.meanings.map((part) => (
            <div>
              <ul>
                {part.definitions.slice(0, 2).map((definition) => (
                  <li>
                    {definition.synonyms && definition.synonyms.length > 0
              ? definition.synonyms
              : "-"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
//https://api.dictionaryapi.dev/api/v2/entries/en/hello
/*{data?.meanings.map((part) => (
            <div key={part.partOfSpeech}>
              <h4>{part.partOfSpeech}</h4>
              <ul>
                {part.definitions.slice(0, 4).map((definition, index) => (
                  <li key={index}>
                    {definition.example && <span> - {definition.example}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}*/ 