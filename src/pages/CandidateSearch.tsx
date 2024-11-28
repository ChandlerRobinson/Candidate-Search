import React, { useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../types";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [noCandidates, setNoCandidates] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const fetchedCandidates = await searchGithub();
        if (fetchedCandidates.length > 0) {
          setCandidates(fetchedCandidates);
          setCurrentCandidate(fetchedCandidates[0]);
        } else {
          setNoCandidates(true);
        }
      } catch (error) {
        setError("Failed to fetch candidates. Please try again later.");
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      if (!currentCandidate || !currentCandidate.username) return;

      setIsLoadingDetails(true);
      try {
        const detailedCandidate = await searchGithubUser(currentCandidate.username);
        if (detailedCandidate) {
          setCurrentCandidate((prev) => ({ ...prev, ...detailedCandidate }));
        }
      } catch (error) {
        setError("Failed to fetch candidate details. Please try again later.");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchCandidateDetails();
  }, [currentCandidate?.username]);

  const handleSaveCandidate = () => {
    if (!currentCandidate) return;

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    savedCandidates.push(currentCandidate);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

    showNextCandidate();
  };

  const showNextCandidate = () => {
    const remainingCandidates = candidates.slice(1);
    if (remainingCandidates.length > 0) {
      setCandidates(remainingCandidates);
      setCurrentCandidate(remainingCandidates[0]);
    } else {
      setNoCandidates(true);
      setCurrentCandidate(null);
    }
  };

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {noCandidates ? (
        <p>No more candidates available to review.</p>
      ) : isLoadingDetails ? (
        <p>Loading candidate details...</p>
      ) : currentCandidate ? (
        <CandidateCard
          name={currentCandidate.name || currentCandidate.username}
          username={currentCandidate.username}
          avatarUrl={currentCandidate.avatarUrl}
          htmlUrl={currentCandidate.htmlUrl}
          location={currentCandidate.location || "Not specified"}
          email={currentCandidate.email || "Not provided"}
          company={currentCandidate.company || "Not provided"}
          bio={currentCandidate.bio}
          blog={currentCandidate.blog}
          followers={currentCandidate.followers}
          onSave={handleSaveCandidate}
          onSkip={showNextCandidate}
        />
      ) : (
        <p>Loading candidates...</p>
      )}
    </div>
  );
};

export default CandidateSearch;











