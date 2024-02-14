export const baseURL = 'http://localhost:5000'
export const getApi = async (
  endpoint: string,
  searchParams?: Record<string, string>
) => {
  const queryParams = searchParams
    ? "?" + new URLSearchParams(searchParams)
    : "";
  const fullUrl = baseURL + "/" + endpoint + queryParams;
  const respond = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return respond.json();
};

export const postApi = async (endpoint: string, data: any) => {
  const fullUrl = baseURL + "/" + endpoint;
  const respond = await fetch(fullUrl, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // if don't have this, token can't be set to cookies
  });

  return respond.json();
};

export const putApi = async (endpoint: string, data: any) => {
  const fullUrl = baseURL + "/" + endpoint;
  const respond = await fetch(fullUrl, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // if don't have this, token can't be set to cookies
  });

  return respond.json();
};

export const deleteApi = async (endpoint: string) => {
  const fullUrl = baseURL + "/" + endpoint;
  const respond = await fetch(fullUrl, {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // if don't have this, token can't be set to cookies
  });

  return respond.json();
};
