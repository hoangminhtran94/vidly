import React, { Component } from "react";
import _ from "lodash";
class ListGroup extends React.Component {
  render() {
    const { genre, genCount, currentGenre, onGenreChange } = this.props;

    return (
      <ul className="list-group">
        {genre.map((g) => (
          <li
            key={g._id}
            className={
              g._id === currentGenre._id
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenreChange(g)}
            style={{ cursor: "pointer" }}
          >
            {g.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
