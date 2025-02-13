import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.services";
import { useBaseUrl } from "./useBaseUrl";

export const useLogin = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUsername(getUsername(token));
        else window.location.href =  useBaseUrl + "/login";
    },[]);

    return username;
}