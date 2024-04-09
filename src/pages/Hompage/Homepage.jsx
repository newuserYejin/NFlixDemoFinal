import React from "react";
import Banner from "./components/banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovie/TopRatedMovie";
import "./Homepage.style.css";
import UpComingMovie from "./components/UpComingMovie/UpComingMovie";

// 배너 만들기 (popular movie의 첫번째 아이템 보여주기)
// popular movie
// top rated movie
// up comming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <div className="HomepageContent">
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpComingMovie />
      </div>
    </div>
  );
};

export default Homepage;
