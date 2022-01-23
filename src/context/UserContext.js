import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children, user }) => {
    return (
        <UserContext.Provider value={ {user} }>
                { children }
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };