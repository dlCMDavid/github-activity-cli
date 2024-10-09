import readline from "readline";
import GithubService from "./githubService.js";

const githubService = new GithubService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "github-activity ",
});

console.log("Github activity");
rl.prompt();

rl.on("line", async (line) => {
  const [username] = line.trim().split(" ");

  try {
    await githubService.getUserGithubEvents(username);
  } catch (error) {
    console.error(error.message);
  }

  rl.prompt();
}).on("close", () => {
  console.log("Exit.");
  process.exit(0);
});
