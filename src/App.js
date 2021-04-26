import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [news, setNews] = useState({ articles: [] });
  const [quest, setQuest] = useState("COVID");
  const [submitted, setSubmitted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://newsapi.org/v2/top-headlines?q=${quest}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      setTimeout(() => setIsLoading(false), 5000);
      // setIsLoading(false);
      setNews(result.data);
    };
    submitted && fetchNews();
  }, [quest, submitted]);

  const search = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <div className="container">
        <div className="heading">
          <h2>Grid styled news api app</h2>
        </div>
        <form onSubmit={search}>
          <label htmlFor="question">Enter search phrase </label>
          <input
            id="question"
            value={quest}
            type="text"
            onChange={(e) => {
              setSubmitted(false);
              setQuest(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
        {!isLoading ? (
          <div className="news-block">
            {news.articles.map((article) => (
              <div key={uuidv4()} className="news-card">
                <div className="news-card-title">{article.title}</div>
                <div className="news-card-description">
                  {article.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </>
  );
};

export default App;
