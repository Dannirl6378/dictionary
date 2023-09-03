import React, { useState } from "react";
import axios from "axios";

interface ApiResponse {
  word: string;
  phonetic: string;
  meanings: {
    synonyms: string;
    partOfSpeech: string;
    definitions: {
      synonyms: string;
      definition: string;
      example?: string;
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
        setData(response.data[0]);
        console.log(response.data);
      });
      setWord("");
    }
  };
  console.log(
    data?.meanings.map((part) => {
      if (
        part.synonyms &&
        Array.isArray(part.synonyms) &&
        part.synonyms.length > 0
      ) {
        return part.synonyms.join(", "); // Převede pole synonym na textový řetězec oddělený čárkami
      }
      return null; // Vrátí null, pokud nejsou žádná synonyma
    })
  );
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
          {data?.meanings.map((part, index) => (
            <div key={index}>
              <ul>
                {part.definitions.slice(0, 2).map((definition, defIndex) => (
                  <li key={defIndex}>{definition?.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="example">
          <h3>Example:</h3>
          {data?.meanings.map((part) => (
            <div key={part.partOfSpeech}>
              {part.definitions.slice(0, 2).map((definition, index) => (
                <div key={index}>
                  {definition.example && definition.example.length > 0 && (
                    <ul>
                      {definition.example
                        .split("\n")
                        .map((example, exampleIndex) => (
                          <li key={exampleIndex}>{example}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="synonym">
          <p>Synonym:</p>
          {data?.meanings.map((part) => (
            <div key={part.partOfSpeech}>
              {part.synonyms &&
              Array.isArray(part.synonyms) &&
              part.synonyms.length > 0 ? (
                <ul>
                  {part.synonyms.map((synonym, synonymIndex) => (
                    <li key={synonymIndex}>{synonym}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
/* 
hmm zkusim to jinak 
jak sem předtim poslal tu datovou strukturu tak většina synonym byla prazdná 
až na jeden řádek kde byla vypsána a já ted potřebuji aby to ověřilo všechna snynonyma a ty která nejsou prázdna tak se řádek nezobrazil a tam kde jsou vypsana tak aby se vypsali první 3 
takže by to mohlo být neco jako 

{data?.meanings.map((part) => (
            <div key={part.partOfSpeech}> 
            {part.definitions.synonyms.map((definition,index) => (
              <div key={index}>
              {Array.isArray.forEach(definition.synonyms) &&
                    definition.synonyms.length > 0 && (



                      {data?.meanings.map((part) => (
            <div key={part.partOfSpeech}>
              {part.definitions.slice(0, 2).map((definition, index) => (
                <div key={index}>
                  {Array.isArray(definition.synonyms) &&
                    definition.synonyms?.length > 0 && (
                      <ul>
                        {definition.synonyms.map((synonym: string, synonymIndex) => (
                          <li key={synonymIndex}>{synonym}</li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          ))}
              */
