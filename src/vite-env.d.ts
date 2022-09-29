/// <reference types="vite/client" />

import { Command } from "@tauri-apps/api/shell";
interface Window {
    invoke: (cmd: string, v: Record<string, any>) => Promise<string>
    Command: typeof Command
}