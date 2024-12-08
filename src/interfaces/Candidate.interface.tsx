// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    name?: string; // Optional
    login: string;
    avatarUrl: string;
    htmlUrl: string;
    location?: string; // Optional
    email?: string; // Optional
    company?: string; // Optional
    bio?: string; // Optional
    blog?: string; // Optional (for personal website links)
  }
  