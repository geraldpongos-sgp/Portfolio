"use client";

import React, { createContext, useContext } from "react";
import { PortfolioData, defaultPortfolioData } from "@/data/portfolio";

type Updater = (updater: (data: PortfolioData) => PortfolioData) => void;

interface PortfolioContextValue {
  data: PortfolioData;
  isEditing: boolean;
  blobConfigured: boolean;
  update: Updater;
}

const noopUpdate: Updater = () => {};

const PortfolioContext = createContext<PortfolioContextValue>({
  data: defaultPortfolioData,
  isEditing: false,
  blobConfigured: false,
  update: noopUpdate,
});

export function PortfolioProvider({
  data,
  isEditing = false,
  blobConfigured = false,
  onChange,
  children,
}: {
  data: PortfolioData;
  isEditing?: boolean;
  blobConfigured?: boolean;
  onChange?: Updater;
  children: React.ReactNode;
}) {
  return (
    <PortfolioContext.Provider
      value={{ data, isEditing, blobConfigured, update: onChange ?? noopUpdate }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData(): PortfolioData {
  return useContext(PortfolioContext).data;
}

export function useIsEditing(): boolean {
  return useContext(PortfolioContext).isEditing;
}

export function useBlobConfigured(): boolean {
  return useContext(PortfolioContext).blobConfigured;
}

export function useUpdatePortfolioData(): Updater {
  return useContext(PortfolioContext).update;
}
