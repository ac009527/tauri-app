import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";
import { Slider } from "antd";
import "antd/dist/antd.css";
import Editor from "./components/editor";
(window as any).invoke = invoke;
(window as any).Command = Command;

function App() {
  return (
    <div className="container mx-auto flex h-full">
      <div className="w-2/5 min-w-20 h-full bg-black"></div>
      <div className="flex-1">
        <Editor />
      </div>
    </div>
  );
}

export default App;
