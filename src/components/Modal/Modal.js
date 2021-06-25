import React, { useContext } from "react";
import close from "../../images/close-icon.svg";
import MovieContext from "../../MovieContext";
import styled from "styled-components";
import moment from "moment";
import "./Modal.css";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 98;
  overflow-y: hidden;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  z-index: 99;
  height: 474px;
  width: 583px;
  padding: 20px 27px;

  @media (max-width: 700px) { 
      width: 400px;
  }
`;

const Modal = ({ setModalOpen }) => {
  const { movie } = useContext(MovieContext);

  const closeModal = e => {
    e.preventDefault();
    setModalOpen(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <Background>
      <ModalContainer>
        <header className="modal-header">
          <h3>{movie.original_title}</h3>
          <button>
            <img src={close} alt="close" onClick={e => closeModal(e)} />
          </button>
        </header>
        <section className="modal-content">
          <img src={movie.logo} />
          <aside className="movie-info">
            <label>
              <strong>Release Date: </strong>
              {moment(movie.release_date).format("LL")}
            </label>
            <div className="overview">{movie.overview}</div>
            <div className="votes">
              <strong>{movie.vote_average}</strong> / 10 ({movie.vote_count}{" "}
              total votes)
            </div>
          </aside>
        </section>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
