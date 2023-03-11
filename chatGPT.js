const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * @param {Object} param0
 * @param {Object[]} param0.messages - follows the Chat format of [{ role: "<ex: user>", content: "<ex: Hello>"}] 
 * @returns Chat completion response
 */
async function completeViaChatGPT({ messages }) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 4096,
    temperature: 0, // TODO: appropriate?
  });
  return response;
}

module.exports = { completeViaChatGPT };
