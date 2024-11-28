import React from "react";

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatarUrl: string;
  email: string | null;
  htmlUrl: string;
  company: string | null;
}

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  return (
    <div>
      {candidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index} style={{ border: "1px solid #ddd", padding: "16px", margin: "16px" }}>
              <img
                src={candidate.avatarUrl}
                alt={`${candidate.name}'s avatar`}
                style={{ width: "50px", borderRadius: "50%" }}
              />
              <h3>{candidate.name}</h3>
              <p><strong>Username:</strong> {candidate.username}</p>
              <p><strong>Location:</strong> {candidate.location}</p>
              <p><strong>Email:</strong> {candidate.email || "Not provided"}</p>
              <p><strong>Company:</strong> {candidate.company || "Not provided"}</p>
              <a href={candidate.htmlUrl} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateList;
