export function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

export function sendNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("🌿 PlantCare", { body: message });
  }
}
