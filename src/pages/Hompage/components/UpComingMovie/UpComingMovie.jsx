import React from "react";
import { useUpComingMoviesQuery } from "../../../../hooks/UpComingMovie";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { popularMovieResponsive } from "../../../../constants/responsive";

const UpComingMovie = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div style={{ width: "100%" }}>
      <MovieSlider
        title="UpComing Movies"
        movies={data.results}
        responsive={popularMovieResponsive}
      />
    </div>
  );
};

export default UpComingMovie;
