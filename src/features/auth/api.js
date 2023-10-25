const api_url = "http://localhost:8888";

export async function registerUser(userData) {
    const response = await fetch(`${api_url}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });
    if(!response.ok) {
        throw new Error("Ошибка при регистрации пользователя");
    }
    return response.json();
}

export async function loginUser(userData) {
    const response = await fetch(`${api_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });
    if(!response.ok) {
        throw new Error("Ошибка при аутентификации пользователя");
    }
    return response.json();
}