import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { Candidate } from "../types";
import { searchGithubUser } from "../api/API";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchSavedCandidates = async () => {
      const candidates: Candidate[] = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );

      const detailedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const details = await searchGithubUser(candidate.username);
          return { ...candidate, ...details };
        })
      );

      setSavedCandidates(detailedCandidates);
    };

    fetchSavedCandidates();
  }, []);

  const deleteCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.username !== username
    );

    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="container">
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <CandidateCard
              name={candidate.name || candidate.username}
              username={candidate.username}
              avatarUrl={candidate.avatarUrl}
              htmlUrl={candidate.htmlUrl}
              location={candidate.location || "Not specified"}
              email={candidate.email || "Not provided"}
              company={candidate.company || "Not provided"}
              bio={candidate.bio}
              blog={candidate.blog}
              followers={candidate.followers}
              onSave={() => {}}
              onSkip={() => {}}
            />
            <button
              onClick={() => deleteCandidate(candidate.username)}
              className="delete-btn"
            >
              Delete Candidate
            </button>
          </div>
        ))
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;








