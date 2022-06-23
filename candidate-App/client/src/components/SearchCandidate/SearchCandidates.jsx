import React, { Component } from "react";
import "./SearchCandidates.css";

class SearchCandidates extends Component {
  state = { value: "" };

  onChangeHandler = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.searchCandidates(this.state.value);
    });
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Filter by name..."
        name="name"
        onChange={this.onChangeHandler}
        className="Search-Candidate-Input"
      />
    );
  }
}

export default SearchCandidates;
