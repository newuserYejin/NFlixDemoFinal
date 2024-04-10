import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Col, Row, Alert } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

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

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  console.log("data:", data);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container className="searchContainer">
      <Row>
        <Col lg={6} md={4} xs={12}>
          필터
        </Col>
        <Col lg={6} md={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
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
              pageCount={data.total_pages} // 전체 페이지 수
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
