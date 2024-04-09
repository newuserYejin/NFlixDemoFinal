import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { popularMovieResponsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery(); // 기존에 만들어둔 훅
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">${error.message}</Alert>;
  }

  return (
    <div style={{ width: "100%" }}>
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={popularMovieResponsive} // 구조를 바꿀게 아니기 때문에 그대로 사용해도 된다.
      />
    </div>
  );
};

export default TopRatedMovieSlide;
