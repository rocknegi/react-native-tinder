export const getMatchedUserInfo = (users: any, userLoggedIn: any) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat() as any;
  return { id, ...user };
};
