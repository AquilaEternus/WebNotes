/* Sets the 'x-auth-token' headers with the value of 'token' in local storage. */
export const setTokenHeader = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    if (token) config.headers['x-auth-token'] = token;
    return config
}