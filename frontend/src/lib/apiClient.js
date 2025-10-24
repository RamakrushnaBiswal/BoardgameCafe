import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

async function request(
  path,
  { method = 'GET', body = null, headers = {}, credentials = 'include' } = {}
) {
  const url = `${API_URL}${path}`;

  const opts = { method, headers: { ...headers }, credentials };

  if (body && !(body instanceof FormData)) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  } else if (body) {
    // FormData or other body types
    opts.body = body;
  }

  const token = Cookies.get('authToken');
  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, opts);

  // Try to parse JSON safely
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const errMsg =
      data?.error || data?.message || res.statusText || 'Request failed';
    const err = new Error(errMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export default {
  request,
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
