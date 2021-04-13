import "../styles.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import ResultItem from "./ResultItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

class DisplayResults extends Component {
  constructor() {
    super();
    this.state = {
      expandFilters: false,
      results: [],
      page: 1,
      name: "",
      street: "",
      type: [],
    };
    this.scrollRef = null;
  }
  toggleExpandedFilters = () => {
    this.setState({ expandFilters: !this.state.expandFilters });
  };
  handleFilterInputChange = (event) => {
    var attr = event.target.id;
    var val = event.target.value;
    this.setState({
      [attr]: val,
    });
    this.handleFilter(attr, val);
  };

  handleFilter = (attr, filterText) => {
    console.log(filterText);
    if (filterText !== "") {
      console.log(filterText);
      //filter out search result object
      let brews = this.props.results.filter((brew) => {
        if (!brew[attr]) return false;
        let attrLower = brew[attr].toLowerCase();
        let filterLower = filterText.toLowerCase();
        return attrLower.includes(filterLower);
      });
      this.setState({
        results: brews,
      });
    } else {
      this.setState({
        results: this.props.results,
      });
    }
  };

  handleCheckboxFilter = (event) => {
    let type = event.target.value;
    let checked = event.target.checked;

    //add or remove type from state array
    let array = [...this.state.type];
    if (checked) {
      if (type === "all") array = new Array("all");
      else {
        if (array.includes("all")) array.splice(array.indexOf("all"), 1);
        array.push(type);
      }
    } else {
      array.splice(array.indexOf(type), 1);
      if (array.length === 0) {
        array.push("all");
      }
    }
    this.setState({
      type: array,
    });

    if (!array.includes("all")) {
      //filter out search result object
      let brews = this.props.results.filter((brew) => {
        if (!brew.brewery_type) return false;
        return array.includes(brew.brewery_type);
      });
      this.setState({
        results: brews,
      });
    } else {
      this.setState({
        type: ["all"],
        results: this.props.results,
      });
    }
  };

  componentDidMount = () => {
    this.setState({
      type: ["all"],
      results: this.props.results,
    });
    this.scrollRef = React.createRef();
  };
  componentWillReceiveProps = (props) => {
    this.setState({
      results: props.results,
    });
  };

  //loading more results
  handleLoadMore = () => {
    var page = this.state.page + 1;
    this.setState({
      page: page,
    });
    console.log(page);
    this.props.loadMore(page);
    console.log(this.props.results.length);
  };

  scrollTop = () => {
    this.scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  render() {
    const { results, type, expandFilters } = this.state;
    return (
      <div ref={this.scrollRef} className="fullWidth">
        {results.length > 0 ||
        (type.includes("all") && type.length > 1) ||
        (!type.includes("all") && type.length > 0) ||
        this.state.name ||
        this.state.street ? (
          <div id="filter-main-container" className="fullWidth sticky">
            <div className="fullWidth">
              <p
                id="filter-text"
                onClick={this.toggleExpandedFilters}
                className="title clickable"
              >
                <span style={{ marginRight: "0.2rem" }}>Filter</span>
                <FilterListIcon
                  fontSize="small"
                  className={`icon ${!expandFilters ? "close" : "open"}`}
                />
              </p>
            </div>
            <div
              id="filters-container"
              className={`filterContainer flexContainer flexColumn ${
                !expandFilters ? "hide" : ""
              }`}
            >
              <div id="filter-inputs-group" className="flexContainer fullWidth">
                <input
                  type="text"
                  id="name"
                  value={this.state.name}
                  className="filter-input"
                  placeholder="Company"
                  onChange={this.handleFilterInputChange}
                />
                <input
                  type="text"
                  id="street"
                  value={this.state.street}
                  className="filter-input"
                  placeholder="Address"
                  onChange={this.handleFilterInputChange}
                />
              </div>
              <div
                id="checkbox-filters-container"
                className="flexContainer flexColumn"
              >
                <div className="flexContainer">
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c0"
                      type="checkbox"
                      value="all"
                      checked={this.state.type.includes("all")}
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c0">All</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c1"
                      type="checkbox"
                      value="nano"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c1">Nano</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c2"
                      type="checkbox"
                      value="micro"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c2">Micro</label>
                  </span>
                </div>
                <div className="flexContainer">
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c3"
                      type="checkbox"
                      value="regional"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c3">Regional</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c4"
                      type="checkbox"
                      value="brewpub"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c4">BrewPub</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c5"
                      type="checkbox"
                      value="large"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c5">Large</label>
                  </span>
                </div>
                <div className="flexContainer">
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c6"
                      type="checkbox"
                      value="planning"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c6">Planning</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c7"
                      type="checkbox"
                      value="contract"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c7">Contract</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c8"
                      type="checkbox"
                      value="proprietor"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c8">Proprietor</label>
                  </span>
                  <span className="checkbox-filter-item">
                    <input
                      className="checkbox-filters"
                      id="c9"
                      type="checkbox"
                      value="closed"
                      onChange={this.handleCheckboxFilter}
                    />
                    <label htmlFor="c9">Closed</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div id="search-results-container" className="fullWidth">
          <div
            id="search-results"
            className="flexContainer resultsContainer grow"
          >
            {results.map((brew) => {
              return <ResultItem id={brew.obdb_id} key={brew.obdb_id} brewery={brew} />;
            })}
          </div>
          {results.length % 50 === 0 && results.length > 0 ? (
            <div id="load-more-container">
              <p
                onClick={this.handleLoadMore}
                className="mediumFont clickable colorTextSecondary"
              >
                LOAD MORE <AddIcon fontSize="small" className="icon" />
              </p>
            </div>
          ) : results.length > 0 ? (
            <div id="end-list-container">
              <p className="colorTextTertiary">END OF LIST</p>
              <p
                onClick={this.scrollTop}
                className="clickable colorTextSecondary"
              >
                SCROLL TO TOP{" "}
                <ExpandLessIcon fontSize="small" className="icon" />
              </p>
            </div>
          ) : (
            <p className="colorTextTertiary">NO RESULTS</p>
          )}
        </div>
      </div>
    );
  }
}

//retrieve state from store
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps)(DisplayResults);
