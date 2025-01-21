import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data,callback) => {
    axios.post("https://fakestoreapi.com/auth/login", data)
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err.response.data);
        });
};

export const getUsername = (token) => {
    return jwtDecode(token).user;
}