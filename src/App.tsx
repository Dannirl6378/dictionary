import React, { useState } from "react";
import axios from "axios";

interface DictionaryData {
  word:string;
}

function App() {
  const [word, setWord] = useState(``);
  const [data, setData] = useState<DictionaryData | null>(null);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const getword = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setWord(``);
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
              onKeyDown={getword}
              placeholder="Enter word"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="body">
        <div className="word">
          <h2>Word: {data?.word} </h2>
        </div>
        <div className="definition">
          <p>Definition/Meaning:</p>
        </div>
        <div className="example">
          <p>Example:</p>
        </div>
        <div className="synonym">
          <p>Synonym:</p>
        </div>
      </div>
    </div>
  );
}

export default App;
//https://api.dictionaryapi.dev/api/v2/entries/en/hello
