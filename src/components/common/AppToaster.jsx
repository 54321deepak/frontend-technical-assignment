import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AppToaster = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 800,
        style: {
          background: isDarkMode ? "#1e293b" : "#ffffff",
          color: isDarkMode ? "#f8fafc" : "#0f172a",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          borderRadius: "12px",
          padding: "14px 20px",
          fontWeight: "600",
          fontSize: "0.95rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default AppToaster;
