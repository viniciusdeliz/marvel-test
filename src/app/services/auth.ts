import { v4 as uuid } from 'uuid';
import { parseCookies } from 'nookies';

type SignInRequestData = {
  email: string;
  password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()
  return {
    token: uuid(),
    user: {
      email: data.email,
      password: data.password,
    }
  }
}

export async function recoverUserInformation(token: string) {
  await delay()
  const allCookies = parseCookies();
  const userEmail = allCookies[token];

  return {
    user: {
      email: userEmail,
    }
  }
}