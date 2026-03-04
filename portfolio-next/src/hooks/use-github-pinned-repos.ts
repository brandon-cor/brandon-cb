import { useState, useEffect, useCallback } from "react";

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  updatedAt: string;
  pushedAt: string;
}

const POLL_INTERVAL_MS = 5 * 60 * 1000;

const QUERY = `
query($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage { name color }
          updatedAt
          pushedAt
        }
      }
    }
  }
}`;

export function useGitHubPinnedRepos(count = 3) {
  const [repos, setRepos] = useState<PinnedRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const username = import.meta.env.VITE_GITHUB_USERNAME;

    if (!token || token === "your_github_personal_access_token_here" || !username) {
      setError("GitHub token or username not configured");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: QUERY, variables: { username } }),
      });

      if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

      const json = await res.json();
      const nodes: PinnedRepo[] = json?.data?.user?.pinnedItems?.nodes ?? [];

      const sorted = [...nodes].sort(
        (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
      );

      setRepos(sorted.slice(0, count));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repos");
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchRepos();
    const interval = setInterval(fetchRepos, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRepos]);

  return { repos, isLoading, error };
}
