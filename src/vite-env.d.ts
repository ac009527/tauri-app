/// <reference types="vite/client" />

interface Window {
    invoke: (cmd: string, v: Record<string, any>) => Promise<string>
}