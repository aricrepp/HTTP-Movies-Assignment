import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './UpdateMovie.css';

const initialItem = {
  title: '',
  director: '',
  metascore: 0,
  stars: [],
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // res.data
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'metascore') {
      value = parseInt(value);
    }

    setItem({
      ...item,
      [ev.target.name]: value,
    });
  };

  const changeStarHandler = (e, i) => {
    e.persist();
    let actors = [...item.stars];
    actors[i] = e.target.value;
    setItem({ ...item, stars: [...actors] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        // res.data
        axios
          .get(`http://localhost:5000/api/movies`)
          .then((res) => props.setMovieList(res.data));
        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update_con">
      <h2>Update Item</h2>
      <form className="update_form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="Title"
            value={item.title}
          />
        </label>
        <div className="baseline" />

        <label>
          Director
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={item.director}
          />
        </label>
        <div className="baseline" />

        <label>
          Metascore
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={item.metascore}
          />
        </label>
        <div className="baseline" />

        <label>
          Stars
          {item.stars.map((star, i) => {
            return (
              <input
                type="text"
                name={star}
                onChange={(e) => changeStarHandler(e, i)}
                placeholder="Stars"
                value={star}
              />
            );
          })}
        </label>

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
