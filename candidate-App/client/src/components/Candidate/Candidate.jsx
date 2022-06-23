import React from "react";
import "./Candidate.css";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Candidate = ({ _id, name, phone, role, rating, removeCandidate }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{role}</td>
      <td>{rating}</td>
      <td>
        <button
          onClick={() => removeCandidate(_id)}
          className="Action-Button fa fa-trash"
        ></button>
        <Link to={{ pathname: "/edit", search: _id }}>
          <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>
    </tr>
  );
};

export default Candidate;
