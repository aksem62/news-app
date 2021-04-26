import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <div className="news-card-title">{article.title}</div>
      <div className="news-card-description">{article.description}</div>
      {article.urlToImage && (
        <img
          className="thumbnail"
          src={article.urlToImage}
          alt={article.title}
        />
      )}
    </div>
  );
};

export default NewsCard;
