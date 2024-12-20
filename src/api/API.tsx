const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Invalid API response");
    console.log("Fetched Candidates:", data); // Check raw data
    return data;
  } catch (err) {
    console.error("Error fetching GitHub users:", err);
    return [];
  }
};




const searchGithubUser = async (login: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Error fetching user details");
    console.log("Detailed User Data:", data); // Debugging
    return {
      name: data.name || "Unknown",
      login: data.login || "Unknown",
      avatarUrl: data.avatar_url || "",
      htmlUrl: data.html_url || "#",
      location: data.location || "Unknown",
      email: data.email || "Not provided",
      company: data.company || "Not provided",
    };
  } catch (err) {
    console.error("Failed to fetch user details:", err);
    return null;
  }
};



console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);
console.log("All Env Variables:", import.meta.env);

export { searchGithub, searchGithubUser };

