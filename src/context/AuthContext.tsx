import React, { createContext, useEffect, useMemo, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  booting: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  booting: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(u => {
      setUser(u);
      setBooting(false);
    });
    return unsub;
  }, []);

  const refreshUser = async () => {
    await auth().currentUser?.reload();
    setUser(auth().currentUser);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      booting,

      async signup(name: string, email: string, password: string) {
        const cred = await auth().createUserWithEmailAndPassword(
          email.trim(),
          password,
        );
        const safeName = name.trim();
        if (safeName) {
          await cred.user.updateProfile({ displayName: safeName });
          await auth().currentUser?.reload();
          setUser(auth().currentUser);
        }
      },

      async login(email: string, password: string) {
        await auth().signInWithEmailAndPassword(email.trim(), password);
      },

      async logout() {
        await auth().signOut();
      },
    }),
    [user, booting],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
