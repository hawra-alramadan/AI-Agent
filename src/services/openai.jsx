// // services/openai.js

// export const sendMessageToAPI = async (message) => {
//   const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Get API key from environment variables

//   // Prepare the request body to send to OpenAI's API
//   const response = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4", // Use GPT-4 or any other model
//       prompt: message, // The user's message
//       max_tokens: 150, // Limit on the number of tokens in the response
//       temperature: 0.7, // Control the randomness of the response
//       n: 1, // Number of responses to get from OpenAI
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to get response from OpenAI API. Status: ${response.status}`
//     );
//   }

//   const data = await response.json();
//   const aiMessage = data.choices[0].text.trim(); // Get the response text from the OpenAI API

//   return aiMessage; // Return the AI's message
// };

// services/openai.js

// services/openai.js

export const sendMessageToAI = async (message) => {
  const apiKey = localStorage.getItem("openaiApiKey"); // Get API key from environment variables
  if (!apiKey) {
    throw new Error("Missing OpenAI API key in environment variables.");
  }

  // Use the new endpoint for GPT-4 chat-based API
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4", // Use GPT-4 model
      messages: [
        {
          role: "user", // Set the role as 'user'
          content: message, // The user's message
        },
      ],
      max_tokens: 150, // Limit the number of tokens in the response
      temperature: 0.7, // Controls the randomness of the AI response
      n: 1, // Number of responses to retrieve from OpenAI
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("OpenAI API error:", errorData);
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const aiMessage =
    data.choices?.[0]?.message?.content?.trim() || "No response received.";

  return aiMessage; // Return the AI's response
};

export const transcribeAudio = async (file) => {
  const apiKey = import.meta.env.VITE_openaiApiKey;
  if (!apiKey) {
    throw new Error("Missing OpenAI API key.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "whisper-1");

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Transcription Error:", error);
    throw new Error(error?.error?.message || "Failed to transcribe audio.");
  }

  const data = await response.json();
  return data.text; // This is the transcribed text
};
