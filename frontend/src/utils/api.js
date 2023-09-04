class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _returnRes(res) { return res.ok ? res.json() : Promise.reject }

    getData(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._returnRes)
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._returnRes)
    }

    setUserInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(this._returnRes)
    }

    setUserAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._returnRes)
    }

    addNewCard(data, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(this._returnRes)
    }

    deleteLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._returnRes)
    }

    addLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._returnRes)
    }

    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._returnRes)
    }
}

const api = new Api({
    baseUrl: 'https://api.leila.nomoredomainsicu.ru',
});

export default api;