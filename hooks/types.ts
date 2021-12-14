export interface useAuthTypes {
  signInWithGoogle?: () => void;
  loading?: Boolean;
  logout?: () => void;
  user?: {
    photoURL: string;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Login: undefined;
};
