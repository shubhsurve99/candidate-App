import React, { Component } from "react";
import "./EditCandidate.css";
import axios from "axios";
import { withRouter } from "react-router";
import { toast, ToastContainer } from "react-toastify";

class EditCandidate extends Component {
  state = {
    id: "",
    name: "",
    phone: 0,
    role: "",
    rating: 0,
    response: "",
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
      let search = this.props.location.search,
        id = search.substring(1, search.length);
      const updateCandidate = await axios(`/api/candidates/${id}`);
      const { name, phone, role, rating } = updateCandidate.data.candidate;
      this.setState({ id, name, phone, role, rating });
    } catch (err) {
      this.setState({ response: "Candidate not found!" });
    }
  }

  updateCandidateHandler = async (e) => {
    e.preventDefault();
    try {
      const candidate = await axios.put(`/api/candidates/${this.state.id}`, {
        name: this.refs.name.value,
        phone: this.refs.phone.value,
        role: this.refs.role.value,
        rating: this.refs.rating.value,
      });
      toast(candidate.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "Candidate not found!")
      return <h1>Candidate not found!</h1>;
    return (
      <div className="Edit-Candidate-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateCandidateHandler}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the candidate here"
            name="name"
            onChange={this.onChangeHandler}
            ref="name"
            className="Add-Candidate-Input"
            required
            id="name"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            placeholder="Enter the phone of the candidates here"
            name="phone"
            onChange={this.onChangeHandler}
            ref="phone"
            className="Add-Candidate-Input"
            required
            id="phone"
          />
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            placeholder="Enter the role of the candidates here"
            name="role"
            onChange={this.onChangeHandler}
            ref="role"
            className="Add-Candidate-Input"
            required
            id="role"
          />
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            placeholder="Enter the rating of the candidates here"
            name="rating"
            onChange={this.onChangeHandler}
            ref="rating"
            className="Add-Candidate-Input"
            required
            id="rating"
          />
          <button
            type="submit"
            className="Edit-Candidate-Submit fa fa-pencil"
          ></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditCandidate);
