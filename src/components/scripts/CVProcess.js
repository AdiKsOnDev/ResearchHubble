import OpenAI from 'openai';
import returnKey from './apiKey';
const openai = new OpenAI({ apiKey: returnKey("OpenAI"), dangerouslyAllowBrowser: true });

const prompt = `
Based on the given CV, summarize it with ONLY KEY points and list skills with the persons proefficency 
in them rated on a scale of "Novice", "Intermediate", "Advanced" and "Expert"
The JSON string returned should be in the following format:
The selected skills should be concise, the skills should only contain letters in the english alphabet, nothing else
{
  "summary": "key points in cv",
  "skills": {
    "SkillName": "SkillLevel",
    ...
  }
}
`;

async function CVProcess(CV) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional CV reviewer.' },
        { role: 'user', content: CV + '\n' + prompt },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.1,
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default CVProcess;
