import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "github-activity ",
});

console.log('Task Tracker. Type "help" for available commands.');
rl.prompt();

rl.on("line", (line) => {
  const [command, ...args] = line.trim().split(" ");
  rl.prompt();
}).on("close", () => {
  console.log("Exit.");
  process.exit(0);
});
