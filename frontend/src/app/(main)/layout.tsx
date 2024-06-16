"use client";

import { Navbar } from "@/components/Navbar";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;
