import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import UpdateMovie from './Movies/UpdateMovie';
import Movie from './Movies/Movie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route
        exact
        path="/"
        render={(props) => <MovieList {...props} movies={movieList} />}
      />

      <Route
        path="/movies/:id"
        render={(props) => (
          <Movie
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
            addToSavedList={addToSavedList}
          />
        )}
      />

      <Route
        path="/update-movies/:id"
        render={() => (
          <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
        )}
      />
    </>
  );
};

export default App;
