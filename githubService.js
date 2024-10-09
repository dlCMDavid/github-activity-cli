class GithubService {
  constructor() {}

  fetchData(username) {
    const apiUrl = `https://api.github.com/users/${username}/events`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error: " + response.status);
        }
        return response.json(); // Parsear la respuesta JSON
      })
      .then((data) => {
        console.log(data); // Aquí puedes manejar los datos recibidos
      })
      .catch((error) => {
        console.error("There was a problem with the API call:", error);
      });
  }
}

export default GithubService;
