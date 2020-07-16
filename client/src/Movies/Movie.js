import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, NavLink, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const { addToSavedList, movieList, setMovieList } = props;

  const item = movieList.find(
    (thing) => `${thing.id}` === props.match.params.id
  );

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${item.id}`)
      .then((res) => {
        // setMovieList.(res.data);
        axios
          .get(`http://localhost:5000/api/movies`)
          .then((res) => setMovieList(res.data));
        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

      <div
        className="update-button"
        onClick={() => push(`/update-movies/${item.id}`)}
      >
        Update
      </div>
    </div>
  );
};

export default Movie;
