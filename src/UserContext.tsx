import { createContext } from "react";

export const UserContext = createContext({
    user: themes.dark,
    updateUser: () => {},
});
