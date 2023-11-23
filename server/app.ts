import axios, { AxiosResponse } from "axios";

let response: Array<any> = [];

const apiUrl: string =
  "https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno";

axios
  .get(apiUrl)
  .then((res: AxiosResponse) => {
    response = res.data;
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
