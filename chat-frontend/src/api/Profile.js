const API_URL = "http://localhost:8001/profile/api/v1";


export async function get_profile(user_id) {
    console.log("DASDDADSADSA")
    try {
        const response = await fetch(`${API_URL}/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка загрузки профиля');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error.message || error);
        throw error; // Перебрасываем ошибку для обработки в компоненте
    }
}
