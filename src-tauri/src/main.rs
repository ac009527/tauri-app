#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use core::num;
use std::process::Command; // 引入命令模块
                           // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn test_val(val: &str) -> String {
    format!("test val is :{}", val)
}

#[tauri::command]
fn run_cmd(cmd: &str) -> Result<String, String> {
    let output = Command::new("bash").arg("-c").arg(cmd).output().unwrap();
    let out = String::from_utf8(output.stdout).unwrap();
    if !out.is_empty() {
        Ok(out)
    } else {
        Err(format!("{} is not shell", cmd))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, test_val, run_cmd])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
