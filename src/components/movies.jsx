import React, { Component, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagnition from "./common/pagnition";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genre: [],
    currentGenre: {},
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  newMovies = (newmovie) => {
    const newMovies = {};
    const movies = [...this.state.movies];
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genre = [{ _id: "", name: "All Genre" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genre });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movie };
    movies[index].isClick = !movies[index].isClick;
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().match(searchQuery.toLowerCase())
      );
    } else if (currentGenre && currentGenre._id) {
      filtered = movies.filter((m) => m.genre._id === currentGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movie = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movie };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genre, currentGenre, sortColumn } =
      this.state;

    if (count === 0) return <p>There is not any movie in database</p>;

    const { totalCount, data: movie } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genreCount={genre.length}
            genre={genre}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary" to="/movies/new">
            New movie
          </Link>
          <p>Number of movies: {totalCount}</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movie={movie}
            onHandleClick={this.handleClick}
            onHandleDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          {totalCount > pageSize ? (
            <Pagnition
              itemCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
