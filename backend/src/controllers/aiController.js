import { openai } from '../services/openaiClient.js';
import { logger } from '../config/logger.js';

export const runAiHelper = async (req, res) => {
  const { prompt, context } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      input: [
        {
          role: 'system',
          content:
            'You are EverDay, an encouraging productivity mentor that gives concise, practical advice about habits, focus, notes, and time management.',
        },
        ...(context
          ? [
              {
                role: 'user',
                content: `Context: ${context}`,
              },
            ]
          : []),
        {
          role: 'user',
          content: prompt.trim(),
        },
      ],
    });

    const reply = response?.output_text?.join('').trim();

    if (!reply) {
      return res.status(502).json({ error: 'AI did not return a response' });
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
