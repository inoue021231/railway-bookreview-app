/* type requestOptions = {
    method: String,
    headers: {"Content-Type": String},
    body: object
} */

const request = async (path: string, options: RequestInit = {}) => {
  const url = `https://railway.bookreview.techtrain.dev${path}`;
  const response = await fetch(url, options);
  return response.json();
};

export const postUser = (user: object) => {
  return request("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const getUser = (token: string) => {
  return request("/users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};
