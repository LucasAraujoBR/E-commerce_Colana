import { useCookies } from "react-cookie";
import useInterest from "../stores/interests";
import useUser from "../stores/user";
import { Interest } from "../types";

const optionsPost = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    Authorization: `${import.meta.env.VITE_KEY}`,
  },
};

const optionsGet = { ...optionsPost, method: "GET" };
const optionsDelete = { ...optionsPost, method: "DELETE" };
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const CreateInterest = async (bodyData: any) => {
  try {
    const formData = new FormData();
    let options;
    if (bodyData.file) {
      for (const key in bodyData.data) {
        formData.append(key, bodyData.data[key]);
      }
      formData.append("file", bodyData.file);
      options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bodyData.token}`,
        },
        body: formData,
      };
    } else {
      options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${bodyData.token}`,
        },
        body: JSON.stringify(bodyData.data),
      };
    }

    const response = await fetch(`${baseUrl}/interest/` as string, options);
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

export const GetInterests = async (bodyData: any) => {
  try {
    const response = await fetch(`${baseUrl}/interest/` as string, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${bodyData.token}`,
      },
      // body: JSON.stringify(bodyData),
    });
    if (
      response?.status === 400 ||
      response?.status === 401 ||
      response?.status === 404
    ) {
      return { error: response?.statusText };
    }
    const dataToReturn = await response.json();
    return dataToReturn.data;
  } catch (error) {
    return null;
  }
};

export const RemoveInterest = async (bodyData: any) => {
  const { id } = bodyData;
  try {
    const response = await fetch(`${baseUrl}/interest/${id}` as string, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${bodyData.token}`,
      },
    });
    if (
      response?.status === 400 ||
      response?.status === 401 ||
      response?.status === 404
    ) {
      return { error: response?.statusText };
    }
    const dataToReturn = await response.json();
    return dataToReturn.data;
  } catch (error) {
    return null;
  }
};
