import express from 'express';
import habitService from './habitService.js';
import cron from 'node-cron';
import logger from './logger.js';

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.post('/habits', (req, res) => {
  const { name, dailyGoal } = req.body;
  const newHabit = habitService.addHabit(name, dailyGoal);
  res.status(201).json(newHabit);
});

app.put('/habits/:id', (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const updatedHabit = habitService.markHabitComplete(id, date);
  if (updatedHabit) {
    res.status(200).json(updatedHabit);
  } else {
    res.status(404).json({ error: 'Habit not found' });
  }
});

app.get('/habits', (req, res) => {
  const habits = habitService.getHabits();
  res.json(habits);
});

app.get('/habits/report', (req, res) => {
  const report = habitService.getWeeklyReport();
  res.json(report);
});

// Start Cron Job to send reminders (simplified version)
cron.schedule('0 9 * * *', () => {
  logger.log('Sending daily reminders for incomplete habits...');
  habitService.sendReminders();
});

app.listen(port, () => {
  logger.log(`Server running at http://localhost:${port}`);
});
