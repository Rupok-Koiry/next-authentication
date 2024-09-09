export const findUserByEmail = async (email: string) => {
  const res = await fetch(`${process.env.API_URL}/users?email=${email}`);
  const [user] = await res.json();
  return user;
};
