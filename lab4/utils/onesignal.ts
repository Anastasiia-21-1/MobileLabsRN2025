import Constants from "expo-constants";
import {LogLevel, NotificationWillDisplayEvent, OneSignal} from "react-native-onesignal";
import axios from "axios";

const oneSignalAppId = Constants?.expoConfig?.extra?.oneSignalAppId
const oneSignalAuthToken = Constants?.expoConfig?.extra?.oneSignalAuthToken

const oneSignalApi = axios.create({
  baseURL: "https://api.onesignal.com/notifications",
  headers: {
    'Accept': 'application/json',
    'Authorization': `Basic ${oneSignalAuthToken}`,
    'Content-Type': 'application/json'
  }
})

if (!oneSignalAppId || !oneSignalAuthToken) {
  throw new Error('OneSignal credentials not found');
}

export const send = async (title: string, description: string, time: Date) => {
  return oneSignalApi.post("", {
    params: {
      c: "push"
    },
    body: {
      app_id: oneSignalAppId,
      contents: {
        en: `${title}\n${description}`
      },
      included_segments: ['todo'],
      send_after: time
    }
  })
};

export const cancel = async (id: string) => {
  return oneSignalApi.delete(`/${id}`, {
    params: {
      app_id: oneSignalAppId
    }
  })
};

const handleForegroundWillDisplay = (event: NotificationWillDisplayEvent) => {
  event.preventDefault()
  event.notification.display()
}

export function init() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(oneSignalAppId);
  void OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleForegroundWillDisplay)
  return () => {
    OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleForegroundWillDisplay)
  }
}

