import { supabaseAdmin } from '../services/supabaseClient.js';
import { logger } from '../config/logger.js';

export const submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Feedback cannot be empty' });
    }

    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert({
        user_id: req.userId || null,
        message: message.trim(),
      })
      .select()
      .single();

    if (error) {
      logger.error('submitFeedback db error', error);
      return res.status(400).json({ error: 'Unable to save feedback' });
    }

    return res.status(201).json({ feedback: data });
  } catch (error) {
    logger.error('submitFeedback failed', error);
    return res.status(500).json({ error: 'Unable to submit feedback' });
  }
};
