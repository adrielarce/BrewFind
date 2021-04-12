import "../styles.css";
import React, { Component } from "react";
import MoreOutlinedIcon from "@material-ui/icons/MoreOutlined";

class ResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: props.brewery.name,
      type: props.brewery.brewery_type,
      city: props.brewery.city,
      state: props.brewery.state,
      street: props.brewery.street,
      postal_code: props.brewery.postal_code,
      website: props.brewery.website_url,
    };
  }
  componentWillReceiveProps = (props) => {
    this.setState({
      name: props.brewery.name,
      type: props.brewery.brewery_type,
      city: props.brewery.city,
      state: props.brewery.state,
      street: props.brewery.street,
      postal_code: props.brewery.postal_code,
      website: props.brewery.website_url,
    });
  };

  handleShowModal = () => {
    this.setState({
      showModal: false,
    });
  };
  handleCloseModal = () => {
    console.log("test1");
    this.setState({
      showModal: false,
    });
    console.log(this.state.showModal);
  };

  render() {
    const brewery = this.state;
    return (
      <div
        id="result_item-container"
        className="flexContainer flexColumn resultItem grow"
        onClick={this.handleShowModal}
      >
        <p className="alignSelfStart">
          Type:{" "}
          <em>
            {brewery.type.charAt(0).toUpperCase() + brewery.type.substring(1)}
          </em>
        </p>
        <h3>{brewery.name}</h3>
        <p>{brewery.street}</p>
        <div>
          <Modal brewery={brewery} />
        </div>
      </div>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: "",
      street: "",
      postal_code: "",
      city: "",
      state: "",
      website: "",
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      name: this.props.brewery.name,
      street: this.props.brewery.street,
      postal_code: this.props.brewery.postal_code,
      city: this.props.brewery.city,
      state: this.props.brewery.state,
      website: this.props.brewery.website,
    });
  };

  handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const brew = this.state;
    return (
      <div>
        {this.state.showModal ? (
          <div className="modal-backdrop">
            <div
              id="result_modal-container"
              className="flexContainer flexColumn"
            >
              <p className="modalTitle largeText mediumFont">{brew.name}</p>
              <p>{brew.street}</p>
              <p>
                {brew.city}, {brew.state}{" "}
                {brew.postal_code ? brew.postal_code : ""}
              </p>
              {brew.website ? (
                <p>
                  <a target="_blank" rel="noreferrer" href={brew.website}>
                    Company Website
                  </a>
                </p>
              ) : (
                ""
              )}
              <button
                id="modal-close-btn"
                className="modal-close-btn"
                onClick={this.handleCloseModal}
              >
                close
              </button>
            </div>
          </div>
        ) : (
          <p onClick={this.handleOpenModal} className="smallText clickable">
            <em>More Info </em>
            <MoreOutlinedIcon
              className="icon"
              fontSize="small"
              htmlColor="#333"
            />
          </p>
        )}
      </div>
    );
  }
}

export default ResultItem;
