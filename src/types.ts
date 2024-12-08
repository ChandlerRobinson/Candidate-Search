export interface Candidate {
    name?: string; // Optional, as not all candidates may have it
    login: string;
    avatarUrl: string;
    htmlUrl: string;
    location?: string; // Optional
    email?: string; // Optional
    company?: string; // Optional
  }
  