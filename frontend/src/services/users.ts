const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    Authorization: `${import.meta.env.VITE_KEY}`,
  },
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const CreateUser = async (bodyData: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/clients` as string,
      {
        ...options,
        body: JSON.stringify(bodyData),
      }
    );
    const dataToReturn = await response.json();
    return dataToReturn;
  } catch (error) {
    return null;
  }
};

export const SignIn = async (bodyData: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/login` as string,
      {
        ...options,
        body: JSON.stringify(bodyData),
      }
    );
    const dataToReturn = await response.json();
    return dataToReturn;
  } catch (error) {
    return null;
  }
};
