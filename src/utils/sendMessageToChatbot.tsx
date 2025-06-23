export async function sendMessageToChatbot(message: string, endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to communicate with chatbot.");
    }

    return { message: data.message };
  } catch (error) {
    console.error("Error sending message:", error);
    return { message: "I'm having trouble responding right now. Try again later." };
  }
}
