import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovie";
import { Container, Col, Row, Alert, Badge } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import "./MovieDetailPage.style.css";
import MovieReview from "./component/Reviews/MovieReview";
import RecommendMovies from "./component/RecommendMovies/RecommendMovies";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from "../../hooks/useMovieTrailer";

const MovieDetailPage = () => {
  const [totalReviews, setTotalReviews] = useState(0);
  // const locationURL = useLocation();

  useEffect(() => {
    console.log("totalReviews:", totalReviews);
  }, [totalReviews]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      loop: 1,
    },
  };

  // useEffect(() => {
  //   // URL이 변경될 때마다 실행될 로직
  //   console.log("URL이 변경되었습니다:", locationURL.pathname);
  //   // 여기에 페이지를 다시 렌더링하거나 필요한 작업을 수행합니다.
  // }, [locationURL]);

  const { id } = useParams();
  console.log("id:", id);

  const [selectedSection, setSelectedSection] = useState("review");
  const { data, isLoading, isError, error } = useDetailMoviesQuery(id);
  const { data: MovieTrailerKey } = useMovieTrailerQuery(id);

  console.log("MovieTrailerKey:", MovieTrailerKey);

  console.log("Detail data:", data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const genreList = data.genres.map((genre, index) => {
    return { name: genre.name, id: genre.id };
  }); // 장르로 검색 시 필요할지 모르니까 id 추가해놓기

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  return (
    <Container className="detailAllBox">
      <Row className="detailRow">
        <Col lg={5} md={5} sm={5} xs={12}>
          <img
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
          />
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <h1 className="detailTitle">{data.title}</h1>
          <hr></hr>
          <div className="detailGenre">
            {genreList.map((genre, index) => {
              return (
                <Badge bg="danger" key={index}>
                  {genre.name}
                </Badge>
              );
            })}
          </div>
          <hr></hr>
          <div className="detailUserInfo">
            <div>
              <div>
                <FontAwesomeIcon icon={faStar} />
                {parseFloat(data.vote_average).toFixed(1)}
              </div>
              <div>
                <FontAwesomeIcon icon={faUsers} />
                {parseInt(data.popularity)}
              </div>
              <div
                className="detailAdult"
                style={
                  data.adult
                    ? { backgroundColor: "red", color: "white" }
                    : { backgroundColor: "green", color: "white" }
                }
              >
                {data.adult ? "over 18" : "ALL"}
              </div>
            </div>
            <Button variant="dark" className="trailer" onClick={handleShow}>
              trailer
            </Button>
          </div>
          <hr></hr>
          <div className="detailOverview">
            {data.overview.charAt(0).toUpperCase() + data.overview.slice(1)}
          </div>
          <hr></hr>
          <div className="detailAddMovieInfo">
            <div>
              <Badge bg="danger">release date</Badge>
              <div>{data.release_date}</div>
            </div>
            <div>
              <Badge bg="danger">budget</Badge>
              <div>&#36; {data.budget.toLocaleString()}</div>
            </div>
            <div>
              <Badge bg="danger">revenue</Badge>
              <div>&#36; {data.revenue.toLocaleString()}</div>
            </div>
            <div>
              <Badge bg="danger">runtime</Badge>
              <div>{data.runtime}mins</div>
            </div>
          </div>
        </Col>
      </Row>
      <hr></hr>
      <div className="selectButton">
        <input
          type="radio"
          id="review"
          name="section"
          value="review"
          checked={selectedSection === "review"}
          onChange={handleSectionChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor="review"
          className={selectedSection === "review" ? "checkButton" : ""}
        >
          Review ({totalReviews})
        </label>
        <input
          type="radio"
          id="recommend"
          name="section"
          value="recommend"
          checked={selectedSection === "recommend"}
          onChange={handleSectionChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor="recommend"
          className={selectedSection === "recommend" ? "checkButton" : ""}
        >
          Recommend Movies
        </label>
      </div>
      {selectedSection === "review" && (
        <div>
          <MovieReview id={id} setTotalReviews={setTotalReviews}></MovieReview>
        </div>
      )}
      {selectedSection === "recommend" && (
        <Row>
          <Col>
            <RecommendMovies id={id} />
          </Col>
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YouTube videoId={MovieTrailerKey} opts={opts} onReady={onReady} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MovieDetailPage;
