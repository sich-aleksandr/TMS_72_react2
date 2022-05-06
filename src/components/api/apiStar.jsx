
const HOST = "https://swapi.dev/api";

export const getCurrentPoint = (point, id) => {
  const url = `${HOST}/${point}/${id}`;

  
  return request(url);
};

export const request = (url) => {

  return fetch(`${url}`).then((r) => {
    if (r.ok) {
      return r.json();
    }
    throw new Error("Some error");
  });
};

