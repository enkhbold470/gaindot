//this is for storing clerk user name and wallet address to the mongoDB
async function saveScore(username, wallet, score) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, wallet, score }),
  });
  return response.json();
}
export default saveScore;
