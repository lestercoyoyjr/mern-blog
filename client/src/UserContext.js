import { createContext, useState } from "react";

export const UserContext = createContext({});

export function userContextProvider ({children}) {
    const [userInfo, setUserinfo] = useState();
    return (
        <userContextProvider value={{userInfo, setUserinfo}}>
            {children}
        </userContextProvider>
    );
}