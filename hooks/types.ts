export interface useAuthTypes {
  signInWithGoogle?: () => void;
  loading?: Boolean;
  logout?: () => void;
  user?: {
    photoURL: string;
    displayName: string;
    uid: string;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Login: undefined;
  Modal: undefined;
};

export enum Routes {
  home = "Home",
  chat = "Chat",
  login = "Login",
  modal = "Modal",
}

export interface Profile {
  id: number;
  displayName: string;
  job: string;
  age: number;
  photoURL: string;
}
