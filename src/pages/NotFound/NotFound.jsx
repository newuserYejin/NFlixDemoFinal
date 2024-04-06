import React from "react";
import "./NotFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";

const NotFound = () => {
  return (
    <div className="NotFoundPage">
      <div className="facedown">
        <FontAwesomeIcon
          className="facedownIcon"
          icon={faFaceFrown}
          style={{ color: "#32398f" }}
        />
      </div>
      <div className="NotFoundMent">404Error</div>
      <div>원하시는 페이지를 찾지 못했습니다. URL 주소를 다시 확인해주세요</div>
    </div>
  );
};

export default NotFound;
