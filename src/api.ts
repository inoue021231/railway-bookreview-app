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

export const signinUser = (user: object) => {
  return request("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const getBookList = (token: string, index: number) => {
  return request(`/books?offset=${index}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const postIcon = (token: string, file: File) => {
  const formData = new FormData();
  formData.append("icon", file);

  return request("/uploads", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
};

export const getPublicBookList = (index: number) => {
  return request(`/public/books?offset=${index}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const putUsers = (token: string, user: object) => {
  return request("/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(user),
  });
};

export const postBooks = (token: string, review: object) => {
  return request("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(review),
  });
};
