import * as Notifications from "expo-notifications";

// Configure Notification Handling
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowBanner: true, 
    shouldShowList: true,    
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
});

// Notification Configuration
export interface NotificationConfig {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export class NotificationService {
  // Request Notification Permissions
  static async requestPermissions() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      throw new Error("Notification permissions not granted");
    }
  }

  // Schedule a Local Notification
  static async scheduleNotification(
    { title, body, data }: NotificationConfig,
    triggerTime: Date
  ) {
    await this.requestPermissions();

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerTime,
      },
    });
  }

  // Show Immediate Notification
  static async showImmediateNotification(
    { title, body, data }: NotificationConfig
  ) {
    await this.requestPermissions();
  
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sound: true,
        autoDismiss: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now()+1000), // Current time
      },
    });
  }

  // Update an Existing Notification
  static async updateNotification(
    notificationId: string,
    { title, body, data }: NotificationConfig
  ) {
    // Cancel existing notification
    await Notifications.cancelScheduledNotificationAsync(notificationId);

    // Schedule updated notification
    return this.scheduleNotification(
      { title, body, data },
      new Date(Date.now() + 1000) // Trigger immediately
    );
  }

  // Cancel a Specific Notification
  static async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  // Cancel All Notifications
  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }


  static async showOperationNotification(title:string,body:string){
    return await NotificationService.showImmediateNotification({
      title: title,
      body: body,
    });
  }
}
