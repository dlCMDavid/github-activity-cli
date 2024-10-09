import https from "https";

class GithubService {
  constructor() {}

  async getUserGithubEvents(username) {
    if (username.trim().length == 0) throw new Error("Invalid username");

    const apiUrl = `https://api.github.com/users/${username}/events`;

    const options = {
      headers: {
        "User-Agent": "Node.js",
      },
    };

    await this.fetchData(apiUrl, options)
      .then((events) => {
        var groupedEventsByRepoName = this.groupBy(
          events,
          (event) => event.repo.name
        );

        Object.entries(groupedEventsByRepoName).forEach(
          ([repoName, events]) => {
            var groupedEventsByType = this.groupBy(
              events,
              (event) => event.type
            );

            Object.entries(groupedEventsByType).forEach(([type, items]) => {
              switch (type) {
                case "PushEvent":
                  console.log(
                    `- Pushed ${items.length} commits to ${repoName}`
                  );
                  break;
                case "DeleteEvent":
                  console.log(`- Delete branch or tag on ${repoName}`);
                  break;
                case "CreateEvent":
                  console.log(`- New branch or tag create on ${repoName}`);
                  break;
                default:
                  console.log(`- Event with type ${type} not supported`);
                  break;
              }
            });
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async fetchData(apiUrl, options) {
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

  groupBy(array, keyFn) {
    return array.reduce((result, current) => {
      const key = keyFn(current);
      (result[key] = result[key] || []).push(current);
      return result;
    }, {});
  }
}

export default GithubService;
