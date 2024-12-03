let habits = []; // Stores all habits
let habitProgress = []; // Stores progress for habits (in-memory)
let nextHabitId = 1;

class HabitService {
  // Add a new habit
  addHabit(name, dailyGoal) {
    const habit = { id: nextHabitId++, name, dailyGoal, progress: [] };
    habits.push(habit);
    return habit;
  }

  // Mark a habit as completed for the day
  markHabitComplete(id, date) {
    const habit = habits.find(h => h.id === parseInt(id));
    if (habit) {
      habit.progress.push({ date, completed: true });
      return habit;
    }
    return null;
  }

  // Get all habits
  getHabits() {
    return habits;
  }

  // Get a weekly progress report (simple version)
  getWeeklyReport() {
    const report = habits.map(habit => {
      const weeklyProgress = habit.progress.filter(progress => {
        const today = new Date();
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        return new Date(progress.date) >= weekAgo;
      });
      return {
        name: habit.name,
        weeklyProgress,
        totalCompleted: weeklyProgress.length
      };
    });
    return report;
  }

  // Send reminders for incomplete habits (simplified)
  sendReminders() {
    const incompleteHabits = habits.filter(habit => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date
      const isCompletedToday = habit.progress.some(progress => progress.date === today && progress.completed);
      return !isCompletedToday;
    });

    incompleteHabits.forEach(habit => {
      logger.log(`Reminder: You have not completed the habit: "${habit.name}" today.`);
    });
  }
}

// Export the instance of the HabitService class
export default new HabitService();
