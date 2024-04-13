import React from "react";
import { useDetailMoviesQuery } from "../../../../hooks/useDetailMovie";
import { Col, Row, Alert, Badge, Button } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieDetail = ({ id, setShow }) => {
  const { data, isLoading, isError, error } = useDetailMoviesQuery(id);

  console.log("detail movies data:", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const genreList = data.genres.map((genre, index) => {
    return { name: genre.name, id: genre.id };
  });

  const handleShow = () => setShow(true);
  return (
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
  );
};

export default MovieDetail;
