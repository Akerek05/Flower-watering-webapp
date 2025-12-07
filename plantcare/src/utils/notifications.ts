export function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

export function sendNotification(message: string) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification("🌿 PlantCare", { body: message });
  }
}
