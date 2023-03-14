var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
  method: "GET",
  headers: headers,
};

export const FetchCities = async () => {
  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries/BR/cities",
      requestOptions
    );
    const dataToReturn = await response.json();
    return dataToReturn;
  } catch (error) {
    return null;
  }
};
