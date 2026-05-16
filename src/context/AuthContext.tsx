import React, { createContext, useEffect, useMemo, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(u => {
      setUser(u);
      if (u) {
        dispatch(
          UserActions.loginAction({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
          }),
        );
      }
      setBooting(false);
    });
    return unsub;
  }, []);

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
        dispatch(UserActions.logoutAction());
      },
    }),
    [user, booting],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
