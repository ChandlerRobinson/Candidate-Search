import React, { useState } from "react";

interface CandidateProps {
  name: string;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  location: string;
  email: string;
  company: string;
  bio?: string;
  blog?: string;
  followers?: number;
  onSave: () => void;
  onSkip: () => void;
}

const CandidateCard: React.FC<CandidateProps> = ({
  name,
  login,
  avatarUrl,
  htmlUrl,
  location,
  email,
  company,
  bio,
  blog,
  followers,
  onSave,
  onSkip,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="candidate-card">
      <img src={avatarUrl} alt={`${login}'s avatar`} />
      <h2>{name}</h2>
      <p><strong>login:</strong> {login}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Company:</strong> {company}</p>
      <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>

      <button className="save-btn" onClick={onSave}>
        Save Candidate
      </button>
      <button className="skip-btn" onClick={onSkip}>
        Skip Candidate
      </button>
      <button
        className="details-btn"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        {showDetails ? "Hide Details" : "View More Details"}
      </button>

      {showDetails && (
        <div className="candidate-details">
          <p><strong>Bio:</strong> {bio || "No bio available"}</p>
          <p><strong>Blog:</strong> {blog ? <a href={blog} target="_blank" rel="noopener noreferrer">{blog}</a> : "Not provided"}</p>
          <p><strong>Followers:</strong> {followers || 0}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;


