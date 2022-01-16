let serverURL: string;
export const determineAPIServerLocation = async (): Promise<string> => {
  // use cached serverURL if already determined
  if (serverURL) return Promise.resolve(serverURL);

  // first try connecting to localhost and if it's not running connect to the cloud
  try {
    await fetch("http://127.0.0.1:3000/api/overview").then((response) => {
      if (response.status === 200) {
        serverURL = "http://127.0.0.1:3000";
      } else {
        console.log("Server not accessible on localhost port 3000");
        serverURL = "https://barbers-hill-video-server.herokuapp.com/";
      }
    });
  } catch {
    console.log("Server not accessible on localhost port 3000");
    serverURL = "https://barbers-hill-video-server.herokuapp.com";
  }
  console.log("Using API Server URL: ", serverURL);
  return serverURL;
};
