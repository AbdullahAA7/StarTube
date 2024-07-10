// fetchDataWithCache.js
export const fetchDataWithCache = async (
  url,
  localStorageKey,
  expiration = 3600 * 250
) => {
  const cachedData = localStorage.getItem(localStorageKey);
  const cachedTime = localStorage.getItem(`${localStorageKey}_time`);

  if (cachedData && cachedTime && Date.now() - cachedTime < expiration) {
    return JSON.parse(cachedData);
  } else {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      localStorage.setItem(`${localStorageKey}_time`, Date.now());
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  }
};
