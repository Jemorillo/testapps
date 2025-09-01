import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function ensurePermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false; // fallback to in-app banners on web
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted || req.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL || false;
}

export async function scheduleMatchReminders(date: Date, title: string) {
  if (!(await ensurePermissions())) return false;
  if (!Device.isDevice) return false;

  const oneDayBefore = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  const halfHourBefore = new Date(date.getTime() - 30 * 60 * 1000);

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Recordatorio de partido', body: `${title} - Mañana` },
    trigger: oneDayBefore,
  });
  await Notifications.scheduleNotificationAsync({
    content: { title: '¡A la cancha!', body: `${title} - En 30 minutos` },
    trigger: halfHourBefore,
  });
  return true;
}