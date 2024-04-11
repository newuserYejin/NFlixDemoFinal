import React, { useState, useEffect } from "react";
import { useMovieReviewsQuery } from "../../../../hooks/useDetailMovie";
import Alert from "react-bootstrap/Alert";
import "./MovieReview.style.css";

const MovieReview = ({ id, setTotalReviews }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);
  const [toggles, setToggles] = useState([]);

  useEffect(() => {
    if (data) {
      setTotalReviews(data.total_results);
    }
  }, [data, setTotalReviews]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  console.log("data reviews:", data);

  const toggleReview = (index) => {
    const updatedToggles = [...toggles];
    updatedToggles[index] = !updatedToggles[index];
    setToggles(updatedToggles);
  };

  const showReview = (review, index) => {
    const reviewDate = new Date(review.updated_at);

    return (
      <div className="reviewBox" key={index}>
        <div className="reviewTop">
          <div className="reviewAuthor">{review.author}</div>
          <div className="reviewDate">{reviewDate.toLocaleString("en-US")}</div>
        </div>
        <div
          className="reviewContent"
          style={{ WebkitLineClamp: toggles[index] ? undefined : 4 }}
        >
          {review.content}
        </div>
        <div className="toggleButton">
          <div onClick={() => toggleReview(index)}>
            {toggles[index] ? "hidden.." : "add.."}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {data.results.map((review, index) => showReview(review, index))}
      </div>
    </div>
  );
};

export default MovieReview;
