import axios from "axios";

// const BASE_URL = "https://su-banavu-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const toggleDarkMode = async (dbFile, isDark) => {
    try {
        const response = await axios.patch(BASE_URL + dbFile, {
            darkMode: isDark
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDarkMode = async (dbFile) => {
    try {
        const response = await axios.get(BASE_URL + dbFile);
        console.log("http", response.data)
        return response.data.darkMode;
    } catch (error) {
        console.log(error);
    }
}
