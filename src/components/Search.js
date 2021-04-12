import "./styles.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { storeResults, appendResults, clearResults } from "../redux/redux";
import { getBreweriesByCity } from "../api";
import DisplayResults from "./results/DisplayResults";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

class SearchBreweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
    this.myRef = null;
  }

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({
      [id]: event.target.value,
    });
  };
  getBreweries = async (page) => {
    try {
      await getBreweriesByCity(this.state.city, page).then((res) => {
        //append results if page > 1
        if (page > 1) {
          console.log("appending");
          this.props.appendResults(res.data);
        } else {
          this.props.clearResults();
          this.props.storeResults(res.data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  delay = (ms) => new Promise((res) => setTimeout(res, ms));
  handleSearch = async (event) => {
    event.preventDefault();
    this.getBreweries(1);
    await this.delay(500);
    this.myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  componentDidMount = () => {
    this.myRef = React.createRef();
  };
  render() {
    const { results } = this.props;
    return (
      <div className="fullWidth flexContainer">
        <div className="flexContainer flexColumn fullWidth">
          <video autoPlay={true} muted loop id="background-video">
            <source
              src={process.env.PUBLIC_URL + "videos/Beer_Pour.mp4"}
              type="video/mp4"
            />
          </video>
          <div id="mobile_background-container">
            <img
              src={process.env.PUBLIC_URL + "images/Beer_CloseUp-small.jpg"}
              alt="background"
            />
          </div>
          <div id="video-overlay">
            <div id="brewfind_logo">
              <img
                src={process.env.PUBLIC_URL + "images/BrewFind_logo.png"}
                alt="logo"
              />
            </div>
            <div className="typewriter">
              <p>Find a brewery in your city.</p>
            </div>
            <div id="search_input-container">
              <form
                name="search-form"
                id="search-form"
                onSubmit={this.handleSearch}
                className="flexContainer"
              >
                <input
                  type="search"
                  name="city"
                  id="city"
                  placeholder="Enter a city"
                  onChange={this.handleChange}
                />
                <button
                  id="search-btn"
                  className="search-btn"
                  onClick={this.handleSearch}
                >
                  <SearchOutlinedIcon
                    className="search-icon"
                    fontSize="large"
                    htmlColor="white"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div ref={this.myRef} className="fullWidth">
          {results.length > 0 ? (
            <DisplayResults loadMore={this.getBreweries} />
          ) : null}
        </div>
      </div>
    );
  }
}

//retrieve state from store
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  storeResults: (payload) => dispatch(storeResults(payload)),
  appendResults: (payload) => dispatch(appendResults(payload)),
  clearResults: () => dispatch(clearResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBreweries);
