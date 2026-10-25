import styles from "./Notification.module.css";

export type NotificationKind = "info" | "success" | "error";

interface NotificationProps {
  message?: string;
  kind?: NotificationKind;
  onClose?: () => void;
  closeLabel?: string;
}

const KIND_CLASS: Record<NotificationKind, string> = {
  info: styles.notification_info,
  success: styles.notification_success,
  error: styles.notification_error,
};

export function Notification({
  message = "No results found.",
  kind = "info",
  onClose,
  closeLabel = "Close",
}: Readonly<NotificationProps>) {
  return (
    <div className={`${styles.notification} ${KIND_CLASS[kind]}`}>
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className={styles.notification__close}
          onClick={onClose}
          aria-label={closeLabel}
        >
          ×
        </button>
      )}
    </div>
  );
}
