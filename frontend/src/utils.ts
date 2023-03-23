export const moneyMask = (value: string) => {
  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");
  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100
  );
  return "R$ " + result;
};

export function phoneMask(value: string) {
  value = value.slice(0, 15);
  value = value.replace(/\D/g, "");
  value = value.replace(/(^\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{4,5})(\d{4}$)/, "$1-$2");
  return value;
}
