import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Alert,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// 이동 경로 2가지
// 네비바에서 검색 ( popular movie 출력 )
// 키워드 입력 ( 키워드와 관련된 영화 출력)

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const [orderMessage, setOrderMessage] = useState(null);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  console.log("data:", data);

  const [moviesData, setMoviesData] = useState(data);

  const {
    data: genreData,
    isLoading: genreDataIsLoading,
    isError: genreDataIsError,
    error: genreDataError,
  } = useMovieGenreQuery();

  console.log("genreData:", genreData);

  // data가 변경될 때마다 moviesData 업데이트
  useEffect(() => {
    setMoviesData(data);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // useMovieGenreQuery 관련
  if (genreDataIsLoading) {
    return <h1>Genre Loading..</h1>;
  }
  if (genreDataIsError) {
    return <Alert variant="danger">{genreDataError.message}</Alert>;
  }

  // useSearchMovieQuery 관련
  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 인기순 함수
  const OrderHigher = () => {
    const sortedData = [...moviesData.results].sort(
      (a, b) => b.popularity - a.popularity
    );

    // const sortedData = _.sortBy([...moviesData.results], "popularity");    // lodash 사용시의 코드

    console.log("높은 순 정리: ", sortedData);

    setMoviesData({ ...moviesData, results: sortedData });
    setOrderMessage(": High Order");
  };

  const OrderLower = () => {
    const sortedData = [...moviesData.results].sort(
      (a, b) => a.popularity - b.popularity
    );
    console.log("낮은 순 정리: ", sortedData);
    setMoviesData({ ...moviesData, results: sortedData });
    setOrderMessage(": Low Order");
  };

  const GenreFiltering = (genreId) => {
    console.log("장르별 필터링:", genreId);
    const sortedData = [...data.results].filter((movie) =>
      movie.genre_ids.includes(genreId)
    );
    setMoviesData({ ...data, results: sortedData });
    console.log("장르별 필터링 결과: ", sortedData);
  };

  return (
    <Container className="searchContainer">
      <Row>
        <Col lg={6} md={4} xs={12}>
          {/* 인기순 정리 */}
          <DropdownButton
            className="FilterDropBox"
            id="dropdown-basic-button"
            title={
              <div>
                Popularity Order
                <div>{orderMessage}</div>
              </div>
            }
          >
            <Dropdown.Item href="" onClick={OrderHigher}>
              High Order
            </Dropdown.Item>
            <Dropdown.Item href="" onClick={OrderLower}>
              Low Order
            </Dropdown.Item>
          </DropdownButton>
          {/* 장르별 필터링 */}
          <div>
            {genreData.map((genre) => {
              return (
                <Button
                  variant="danger"
                  value={genre.id}
                  onClick={() => GenreFiltering(genre.id)}
                >
                  {genre.name}
                </Button>
              );
            })}
          </div>
        </Col>

        {/* 인기영화 랜덤 뿌리기 */}
        <Col lg={6} md={8} xs={12}>
          <Row className="MoviePagePopularMovies">
            {moviesData && moviesData.results
              ? moviesData.results.map((movie, index) => (
                  <Col lg={4} xs={6}>
                    <MovieCard movie={movie} key={index} />
                  </Col>
                ))
              : data.results.map((movie, index) => (
                  <Col lg={4} xs={6}>
                    <MovieCard movie={movie} key={index} />
                  </Col>
                ))}
          </Row>

          <div className="paginationArea">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={10}
              marginPagesDisplayed={0}
              pageCount={moviesData ? moviesData.total_pages : data.total_pages} // 전체 페이지 수
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel=">>"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
