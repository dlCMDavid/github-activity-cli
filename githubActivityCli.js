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

rl.on("line", (line) => {
  const [username] = line.trim().split(" ");

  githubService.getUserGithubEvents(username);

  rl.prompt();
}).on("close", () => {
  console.log("Exit.");
  process.exit(0);
});
