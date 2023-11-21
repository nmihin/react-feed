import React from "react";
// You can remove the import statements for tanstack libraries

// Remove the reference to the QueryClient and its instantiation
// const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // Remove the QueryClientProvider and client prop
    <>{children}</>
  );
};
