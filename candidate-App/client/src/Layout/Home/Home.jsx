import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
// Components
import Candidate from "../../components/Candidate/Candidate";
import SearchCandidates from "../../components/SearchCandidate/SearchCandidates";

class Home extends Component {
  state = {
    data: null,
    allCandidates: null,
    error: "",
  };

  async componentDidMount() {
    try {
      const candidates = await axios("/api/candidates/");
      this.setState({ data: candidates.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeCandidate = async (id) => {
    try {
      const candidateRemoved = await axios.delete(`/api/candidates/${id}`);
      const candidates = await axios("/api/candidates/");
      this.setState({ data: candidates.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchCandidates = async (username) => {
    let allCandidates = [...this.state.data.candidates];
    if (this.state.allCandidates === null) this.setState({ allCandidates });

    let candidates = this.state.data.candidates.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (candidates.length > 0) this.setState({ data: { candidates } });

    if (username.trim() === "")
      this.setState({ data: { candidates: this.state.allCandidates } });
  };

  render() {
    let candidates;

    if (this.state.data)
      candidates =
        this.state.data.candidates &&
        this.state.data.candidates.map((candidate) => (
          <Candidate
            key={candidate._id}
            {...candidate}
            removeCandidate={this.removeCandidate}
          />
        ));
    else
      return (
        <div className="Spinner-Wrapper">
          {" "}
          <PropagateLoader color={"#333"} />{" "}
        </div>
      );

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.candidates.length)
        return <h1 className="No-Candidates">No candidates!</h1>;

    return (
      <div className="Table-Wrapper">
        <h1>Candidates:</h1>
        <SearchCandidates searchCandidates={this.searchCandidates} />
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{candidates}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
