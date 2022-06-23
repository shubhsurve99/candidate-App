import React, { Component } from "react";
import "./AddCandidate.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddCandidate extends Component {
  state = {
    name: "",
    phone: 0,
    role: "",
    rating: 0,
    response: "",
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  addCandidate = async (e) => {
    e.preventDefault();
    try {
      const newCandidate = await axios.post("/api/candidates/", {
        name: this.refs.name.value,
        phone: this.refs.phone.value,
        role: this.refs.role.value,
        rating: this.refs.rating.value,
      });

      toast(
        "Candidate " +
          newCandidate.data.newCandidate.name +
          " created successfully",
        { type: toast.TYPE.SUCCESS, autoClose: 3000 }
      );
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddCandidate-Wrapper">
        <h1>Add Candidate:</h1>
        <form onSubmit={this.addCandidate}>
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
            className="Add-Candidate-Submit fa fa-plus"
          ></button>
          <button
            type="reset"
            className="Add-Candidate-Reset fa fa-refresh"
          ></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddCandidate;
