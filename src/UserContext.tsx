import { createContext } from "react";

export const UserContext = createContext({
    userInfo: "",
    score: "",
    setUserInfo: () => {}
});
