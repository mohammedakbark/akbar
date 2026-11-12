"use client";

import { createContext, useContext } from "react";

/** True once the preloader has finished — entrance animations wait for it. */
export const ReadyContext = createContext(true);
export const useReady = () => useContext(ReadyContext);
