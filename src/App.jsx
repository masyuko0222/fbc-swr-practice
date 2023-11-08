import useSWR from "swr";
import "./App.css";

const fetcher = async (params) => {
  const [url, headers] = params;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };

  const { data, error, isLoading } = useSWR([url, headers], fetcher);

  if (error) return <p>Failed to load.</p>;
  if (isLoading) return <p>Loading...</p>;

  return <>{data && <p>Status : {data.description}</p>}</>;
}

export default App;
