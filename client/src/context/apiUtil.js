import React from "react";
import axios from "axios";

// post request

export const AXIOSPOST = async url => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
