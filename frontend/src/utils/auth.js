const baseUrl = 'http://api.leila.nomoredomainsicu.ru'

const _checkResponse = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
}

const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => _checkResponse(res))
};

const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => _checkResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        });
};

const getToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => _checkResponse(res))
};

export const authorization = {
    register,
    authorize,
    getToken,
};