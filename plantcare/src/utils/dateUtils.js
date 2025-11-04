export function getTodayPlants(plants) {
  const today = new Date().toDateString();
  return plants.filter(p => new Date(p.nextWatering).toDateString() === today);
}

export function calculateNextWatering(currentDate, frequencyDays) {
  const next = new Date(currentDate);
  next.setDate(next.getDate() + frequencyDays);
  return next;
}
