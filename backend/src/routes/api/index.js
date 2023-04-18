import express from 'express';

const router = express.Router();

import pokemonRoutes from './pokemon';
router.use('/pokemon', pokemonRoutes);

export default router;