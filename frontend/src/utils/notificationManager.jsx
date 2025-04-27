// Utility function to request Notification permission and show a notification
export const triggerNotification = (title, options) => {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };
  
  // Schedule a notification for a specific time
  export const scheduleNotification = (reminder) => {
    const currentTime = new Date().getTime();
    const remindTime = new Date(reminder.remind_time).getTime(); // Ensure remind_time is in ISO format
  
    if (remindTime > currentTime) {
      const delay = remindTime - currentTime;
  
      setTimeout(() => {
        triggerNotification("Reminder Alert!", {
          body: reminder.title,
          icon: "/path-to-icon.png", // Optional: Add an icon for the notification
        });
      }, delay);
    }
  };