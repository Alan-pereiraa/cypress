const API_BASE_URL = 'http://localhost:8000';

export async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error || `API respondeu com status ${response.status}`);
  }

  return body;
}

export const get = (path, token) => request(path, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
export const post = (path, data, token) => request(path, { method: 'POST', body: JSON.stringify(data), headers: token ? { Authorization: `Bearer ${token}` } : {} });
export const put = (path, data, token) => request(path, { method: 'PUT', body: JSON.stringify(data), headers: token ? { Authorization: `Bearer ${token}` } : {} });
export const del = (path, data, token) => request(path, { method: 'DELETE', body: JSON.stringify(data), headers: token ? { Authorization: `Bearer ${token}` } : {} });
