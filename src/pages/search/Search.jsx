import React, { useState } from "react";
import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("");
  const [type, setType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const handleSearch = () => {
    setType(typeInput);
    setOption(selectInput);
    setQuery(searchInput);
  };

  const resetSearch = () => {
    setType("");
    setQuery("");
    setSearchInput("");
    setOption("");
  };

  return (
    <div className="app">
      <Nav />
      <div className="s009">
        <form>
          <div className="inner-form">
            <div className="basic-search">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Type Keywords"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                <div className="icon-wrap">
                  <svg
                    className="svg-inline--fa fa-search fa-w-16"
                    fill="#ccc"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="advance-search">
              <div className="row third">
                <div className="input-field">
                  <div className="result-count">
                    <select
                      onChange={(e) => setSelectInput(e.target.value)}
                      value={selectInput}>
                      <option>-- Thể loại --</option>
                      <option value="28">Hành động</option>
                      <option value="35">Hài</option>
                      <option value="27">Kinh dị</option>
                      <option value="10749">Lãng mạn</option>
                      <option value="99">Tài liệu</option>
                    </select>
                  </div>
                  <div className="result-count">
                    <select
                      onChange={(e) => setTypeInput(e.target.value)}
                      value={typeInput}>
                      <option>-- Thể loại phim --</option>
                      <option value="">All</option>
                      <option value="movie">Movie</option>
                      <option value="tv">Tv</option>
                      <option value="person">Person</option>
                    </select>
                  </div>
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button">
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={() => handleSearch()}>
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult query={query} option={option} type={type} />
    </div>
  );
};

export default Search;
