import React, { createContext, useEffect, useState } from "react";

interface UserShape {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface UserContextType {
  userLogin: boolean;
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  user?: UserShape | null;
  setUser?: React.Dispatch<React.SetStateAction<UserShape | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [userLogin, setUserLogin] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState<UserShape | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserLogin(true);
      // optional: fetch user profile here and setUser(...)
      // fetchProfile(token).then(u => setUser(u)).catch(() => { setUser(null); setUserLogin(false); })
    } else {
      setUserLogin(false);
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}