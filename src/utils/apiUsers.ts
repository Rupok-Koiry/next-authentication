export const findUserByEmail = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?email=${email}`
  );
  const [user] = await res.json();
  return user;
};
export const createUser = async (newUser: {
  email: string;
  name: string;
  password: string;
}) => {
  if (await findUserByEmail(newUser.email)) {
    throw new Error("User already exists");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const user = await res.json();
  return user;
};
