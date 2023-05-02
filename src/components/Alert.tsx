import { Alert } from "reactstrap";

export type AlertParams = { enabled: boolean; message: string; type?: string };

export function PrintAlert({
  message,
  type = "danger",
  setErr,
  enabled,
}: {
  message: string;
  enabled: boolean;
  setErr: (a: AlertParams) => void;
  type?: string;
}) {
  enabled &&
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000 * 5);
    }).then(() => setErr({ enabled: false, message }));
  return (
    <Alert className="pop-up-alert" isOpen={enabled} color={type}>
      {message}
    </Alert>
  );
}
