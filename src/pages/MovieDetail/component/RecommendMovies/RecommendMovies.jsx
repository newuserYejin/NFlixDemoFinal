import React from "react";
import { useRecommendMoviesQuery } from "../../../../hooks/useRecommendMovies";
import { Alert, Col, Row } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { popularMovieResponsive } from "../../../../constants/responsive";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const RecommendMovies = ({ id, setTotalRecommend }) => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery(id);
  console.log("recommend data:", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <div>
        {/* <MovieSlider
          title="Recommend Movies"
          movies={data?.results}
          responsive={popularMovieResponsive}
        /> */}
        <Row>
          {data?.results.map((movie, index) => (
            <Col lg={2} md={3} xs={6}>
              <MovieCard movie={movie} key={index} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default RecommendMovies;
