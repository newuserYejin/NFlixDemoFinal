import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovie";
import { Container, Col, Row, Alert, Badge } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const MovieDetailPage = () => {
  const { id } = useParams();
  console.log("id:", id);

  const { data, isLoading, isError, error } = useDetailMoviesQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const genreList = data.genres.map((genre, index) => {
    return { name: genre.name, id: genre.id };
  }); // 장르로 검색 시 필요할지 모르니까 id 추가해놓기

  console.log("Detail data:", data);
  return (
    <Container>
      <Row>
        <Col xs={5}>
          <img
            style={{ width: "100%" }}
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
          />
        </Col>
        <Col xs={7}>
          <h1>{data.title}</h1>
          <div>
            {genreList.map((genre, index) => {
              return (
                <Badge bg="danger" key={index}>
                  {genre.name}
                </Badge>
              );
            })}
          </div>
          <div
            style={
              data.adult
                ? { backgroundColor: "red" }
                : { backgroundColor: "green" }
            }
          >
            {data.adult ? "over 18" : "ALL"}
          </div>
          <div>release_date: {data.release_date}</div>
          <div>{data.overview}</div>
          <div>
            <FontAwesomeIcon icon={faStar} />
            {parseFloat(data.vote_average).toFixed(1)}
          </div>
          <div>
            <FontAwesomeIcon icon={faUsers} />
            {parseInt(data.popularity)}
          </div>
          <div>budget : {data.budget}</div>
          <div>revenue : {data.revenue}</div>
          <div>runtime : {data.runtime}</div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
