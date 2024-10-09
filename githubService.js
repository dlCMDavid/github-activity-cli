import https from "https";

class GithubService {
  constructor() {}

  getUserGithubEvents(username) {
    const apiUrl = `https://api.github.com/users/${username}/events`;

    const options = {
      headers: {
        "User-Agent": "Node.js",
      },
    };

    this.fetchData(apiUrl, options)
      .then((events) => {
        events.forEach((event) => {
          switch (event.type) {
            case "PushEvent":
              break;
            case "DeleteEvent":
              break;
            case "CreateEvent":
              break;

            default:
              break;
          }
          console.log(
            `ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, CreatedAt: ${task.createdAt}, UpdatedAt: ${task.updatedAt}`
          );
        });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchData(apiUrl, options) {
    return new Promise((resolve, reject) => {
      https
        .get(apiUrl, options, (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            if (response.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(`Error: ${response.statusCode}`);
            }
          });
        })
        .on("error", (error) => {
          reject(`Request failed: ${error.message}`);
        });
    });
  }
}

export default GithubService;
