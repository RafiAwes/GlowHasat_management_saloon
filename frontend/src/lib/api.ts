export const API_URL = 'http://localhost:8000/api';

export const getAccessToken = () => localStorage.getItem('access_token');
export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};
export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = getAccessToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Only set Content-Type if it's not already set and it's NOT FormData
  // When using FormData, the browser will set the correct boundary automatically
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  let response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (response.status === 401 && token) {
    const refresh = localStorage.getItem('refresh_token');
    if (refresh) {
      try {
        const refreshRes = await fetch(`${API_URL}/accounts/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh })
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setTokens(data.access, refresh);
          headers.set('Authorization', `Bearer ${data.access}`);
          response = await fetch(`${API_URL}${url}`, { ...options, headers });
        } else {
          clearTokens();
          window.location.href = '/login';
        }
      } catch (err) {
        clearTokens();
        window.location.href = '/login';
      }
    } else {
      clearTokens();
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch(e) {}
    throw { status: response.status, data: errorData };
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (url: string) => fetchWithAuth(url),
  post: (url: string, body: any) => {
    const options: RequestInit = { method: 'POST' };
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
    return fetchWithAuth(url, options);
  },
  put: (url: string, body: any) => {
    const options: RequestInit = { method: 'PUT' };
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
    return fetchWithAuth(url, options);
  },
  patch: (url: string, body: any) => {
    const options: RequestInit = { method: 'PATCH' };
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
    return fetchWithAuth(url, options);
  },
  delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' })
};
