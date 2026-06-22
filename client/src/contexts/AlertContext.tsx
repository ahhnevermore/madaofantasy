import { createContext, useContext } from "react";

export type AlertSeverity = "error" | "warning" | "info" | "success";

interface AlertContextType {
  showAlert: (severity: AlertSeverity, message: string) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertContext.Provider");
  }

  return context;
}

export default AlertContext;
