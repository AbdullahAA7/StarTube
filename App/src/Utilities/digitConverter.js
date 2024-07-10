export const convert = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M"; // Converts to millions and adds "M"
  } else if (value >= 1000) {
    return (value / 1000).toFixed() + "K"; // Converts to thousands and adds "K"
  } else {
    return value;
  }
};
