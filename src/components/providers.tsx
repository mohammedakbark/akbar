"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { projects } from "@/lib/projects";

interface LauncherState {
  selectedProject: number;
  /** Whether an app is currently launched on the phone screen */
  appOpen: boolean;
  /** Apps viewed this session (shown as a subtle ✓ on the phone) */
  openedApps: Set<number>;
  /** Selects a project and launches it on the phone */
  openApp: (index: number) => void;
  closeApp: () => void;
}

const LauncherContext = createContext<LauncherState | null>(null);

export function useLauncher() {
  const ctx = useContext(LauncherContext);
  if (!ctx) throw new Error("useLauncher must be used inside <Providers>");
  return ctx;
}

/**
 * Providers Component
 * - Shares the Projects phone launcher state, so other sections
 *   (e.g. the tech stack) can open an app directly
 */
export function Providers({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState(0);
  const [appOpen, setAppOpen] = useState(false);
  const [openedApps, setOpenedApps] = useState<Set<number>>(new Set());

  const openApp = useCallback((index: number) => {
    const i = (index + projects.length) % projects.length;
    setSelectedProject(i);
    setAppOpen(true);
    setOpenedApps((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);

  const closeApp = useCallback(() => setAppOpen(false), []);

  const value = useMemo<LauncherState>(
    () => ({ selectedProject, appOpen, openedApps, openApp, closeApp }),
    [selectedProject, appOpen, openedApps, openApp, closeApp]
  );

  return <LauncherContext.Provider value={value}>{children}</LauncherContext.Provider>;
}
