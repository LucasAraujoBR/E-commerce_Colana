const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    Authorization: `${import.meta.env.VITE_KEY}`,
  },
};

const optionsGet = { ...options, method: "GET" };

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const CreateUser = async (bodyData: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/client/` as string,
      {
        ...options,
        body: JSON.stringify(bodyData),
      }
    );
    if (
      response?.status === 400 ||
      response?.status === 401 ||
      response?.status === 404
    ) {
      return { error: response?.statusText };
    }
    const dataToReturn = await response.json();
    return dataToReturn;
  } catch (error) {
    return null;
  }
};

export const GetUser = async (bodyData: any) => {
  const { id } = bodyData;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/client/${id}` as string,
      {
        ...optionsGet,
      }
    );
    if (
      response?.status === 400 ||
      response?.status === 401 ||
      response?.status === 404
    ) {
      return { error: response?.statusText };
    }
    const dataToReturn = await response.json();
    console.log("user by id", dataToReturn);
    return dataToReturn?.data;
  } catch (error) {
    return null;
  }
};

export const SignIn = async (bodyData: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login/` as string,
      {
        ...options,
        body: JSON.stringify(bodyData),
      }
    );
    if (
      response?.status === 400 ||
      response?.status === 401 ||
      response?.status === 404
    ) {
      return { error: response?.statusText };
    }
    const dataToReturn = await response.json();
    return dataToReturn?.data;
  } catch (error) {
    return null;
  }
};
