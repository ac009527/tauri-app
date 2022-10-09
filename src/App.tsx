import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";
import { Slider } from "antd";
import "antd/dist/antd.css";
(window as any).invoke = invoke;
(window as any).Command = Command;

function App() {
  const [brightness, setBrightness] = useState<number | undefined>(undefined);
  const [voice, setVoice] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (brightness == null) {
      return;
    }
    invoke("run_cmd", {
      bash: "powershell",
      val: `(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,${brightness})`,
    });
  }, [brightness]);

  useEffect(() => {
    if (brightness == null) {
      return;
    }
    invoke("run_cmd", {
      bash: "powershell",
      val: `(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,${brightness})`,
    });
  }, [brightness]);
  useEffect(() => {
    invoke("run_cmd", {
      bash: "powershell",
      val: `(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightness).CurrentBrightness`,
    }).then((v) => {
      setBrightness(Number(v));
    });

    invoke("run_cmd", {
      bash: "powershell",
      val: `(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightness).CurrentBrightness`,
    }).then((v) => {
      setBrightness(Number(v));
    });
    // invoke("run_cmd", {
    //   bash: "powershell",
    //   val: `(Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiGetBrightness()`,
    // }).then(() => {});
  }, []);

  return (
    <div className="container">
      <div style={{ width: "80%" }}>
        <Slider
          min={0}
          max={100}
          onChange={(v) => setBrightness(v)}
          value={brightness}
        />
        <Slider min={0} max={100} onChange={(v) => setVoice(v)} value={voice} />
      </div>
    </div>
  );
}

export default App;
