import { getUsername } from "../services/auth.services";

export const useLogin = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUsername(getUsername(token));
        else window.location.href =  import.meta.env.BASE_URL + "/login";
    },[]);

    return username;
}