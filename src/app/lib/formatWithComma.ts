import Numeral from "numeral";

export const formatWithComma = (value: number) => {
  return Numeral(value).format("#,##0");
};
