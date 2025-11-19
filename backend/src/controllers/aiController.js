import { openai } from '../services/openaiClient.js';
import { logger } from '../config/logger.js';

export const runAiHelper = async (req, res) => {
  const { prompt, context } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const messages = [
      {
        role: 'system',
        content:
          'You are EverDay, an encouraging productivity mentor that gives concise, practical advice about habits, focus, notes, and time management.',
      },
      {
        role: 'user',
        content: prompt.trim(),
      },
    ];

    if (context?.length) {
      messages.splice(1, 0, {
        role: 'user',
        content: `Context: ${context}`,
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    });

    const reply = response?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({ error: 'AI did not return a response' });
    }

    res.json({
      reply,
      usage: response.usage,
    });
  } catch (error) {
    logger.error('runAiHelper failed', error);
    res.status(500).json({ error: 'Unable to reach AI helper right now' });
  }
};
