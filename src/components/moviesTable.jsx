import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends React.Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (movies) => (
        <Link to={`/movies/${movies._id}`}>{movies.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          isClick={movie.isClick}
          onClick={() => this.props.onHandleClick(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onHandleDelete(movie)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movie, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movie}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
