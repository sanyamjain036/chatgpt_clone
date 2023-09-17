import openai from "./chatgpt";

const query = async (prompt, chatId, model) => {
  //build ans on previous chat
  try {
    const res = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    return res.choices[0].message.content;
  } catch (err) {
    return `ChatGPT unable to answer! Error:${err.message}`;
  }
};

export default query;
