// src/services/ChatService.js
// src/services/ChatService.js

export const sendMessageToBot = async (message) => {
    const API_KEY = "AIzaSyBM_2V01vyouS_uL_m6c_-ZOI0qYJefmnY";

    // ✅ Đổi model từ gemini-pro sang model được hỗ trợ
    const MODEL = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: message }]
                    }
                ]
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorDetails = data?.error?.message || `Lỗi HTTP: ${response.status}`;
            throw new Error(errorDetails);
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "Không nhận được phản hồi từ bot. Vui lòng kiểm tra lại cấu hình.";
    } catch (error) {
        console.error("Lỗi khi gọi API Gemini:", error);
        return error.message || "Đã có lỗi xảy ra phía client. Vui lòng kiểm tra console.";
    }
};
