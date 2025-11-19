export const requirePlanTier = (tiers = []) => {
  return (req, res, next) => {
    const plan = req.profile?.plan || 'free';
    if (!tiers.includes(plan)) {
      return res.status(403).json({ error: 'This feature requires an upgraded plan.' });
    }
    return next();
  };
};
