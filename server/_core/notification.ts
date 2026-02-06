export type NotificationPayload = {
  title: string;
  content: string;
};

/**
 * Notification stub for self-hosted deployments.
 * Logs the notification to console instead of calling Manus Forge API.
 * Replace with your own notification service (email, Slack webhook, etc.)
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  console.log(`[Notification] ${payload.title}`);
  console.log(`[Notification] ${payload.content}`);
  return true;
}
