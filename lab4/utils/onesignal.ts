import OneSignal from "react-native-onesignal";
import {Alert} from "react-native";
import {Task} from "@/types/task";

const scheduleNotification = async (task: Task) => {
  try {
    const delayInSeconds = Math.floor((task.reminderTime.getTime() - Date.now()) / 1000);

    if (delayInSeconds <= 0) {
      Alert.alert('Invalid Time', 'Please select a future time for the reminder.');
      return null;
    }

    const notification = {
      headings: {en: task.title},
      contents: {en: task.description || 'Reminder for your task'},
      send_after: new Date(Date.now() + delayInSeconds * 1000).toISOString(),
    };

    const result = await OneSignal.postNotification(notification);
    return result.id;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

const cancelNotification = async (notificationId: string) => {
  try {
    if (notificationId) {
      await OneSignal.cancelNotification(notificationId);
    }
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

const initOneSignal = async () => {
  OneSignal.setAppId('YOUR_ONESIGNAL_APP_ID');

  OneSignal.promptForPushNotificationsWithUserResponse();
};