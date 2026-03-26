import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`
            );
            
            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            const currencyData = result[currency];

            // --- Cache Data: Save to LocalStorage ---
            localStorage.setItem(`cache-${currency}`, JSON.stringify(currencyData));
            
            setData(currencyData);

          } catch (error) {
            console.error("Currency API Error:", error);

            // --- Fallback: Try to get data from Cache ---
            const cachedData = localStorage.getItem(`cache-${currency}`);
            
            if (cachedData) {
              console.log("Serving from Cache...");
              setData(JSON.parse(cachedData));
            } else {
              setData({}); // Bilkul hi kuch nahi hai toh empty
            }
          }
        };

        fetchData();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;