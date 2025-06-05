# Hello WiFi

<div align="center">
  <p>一个基于 LLM 的 WiFi 配置管理系统</p>
</div>

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-1.3.22-blue?style=flat-square)](https://github.com/vercel/ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## 📖 项目简介

Hello WiFi 是一个智能的 WiFi 配置管理系统，通过对话式 AI 接口和 AI-SDK 的 Tool Calling 功能，让用户能够轻松查看和修改系统 WiFi 设置。无需记忆复杂的命令行参数和配置选项，只需自然语言交流即可完成 WiFi 管理工作。

### 🌟 核心功能

- **AI 对话界面**: 使用自然语言与系统交流，查询和修改 WiFi 设置
- **Tool Calling 能力**: 通过 AI-SDK 实现的工具调用，直接操作系统 WiFi 配置
- **无线接入点管理**: 支持配置 hostapd，包括 SSID、密码、信道等参数
- **响应式 UI**: 适配桌面与移动设备的现代化界面

## 🚀 特色亮点

- **直观的 WiFi 管理**: 无需记忆命令行参数，通过自然语言对话即可管理 WiFi 设置
- **智能 Tool 执行**: AI 理解用户意图并自动调用适当的系统命令
- **参数智能推荐**: 基于当前配置和最佳实践，AI 会推荐合适的参数设置
- **操作安全保障**: 自动备份配置文件，防止错误配置导致系统不可用

## 🛠 技术栈

- **前端**: Next.js, React, TypeScript, Tailwind CSS
- **AI**: AI-SDK, OpenAI
- **工具调用**: Tool Calling API
- **系统集成**: 通过 Shell 命令与 hostapd 服务交互

## 🔧 快速开始

### 环境要求

- Node.js 18+
- 运行在支持 hostapd 的 Linux 系统上 (如 Raspberry Pi OS)
- 已安装和配置 hostapd 服务

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/llmons/hello-wifi.git
cd hello-wifi

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加你的 API 密钥

# 启动开发服务器
npm run dev
```

### 生产环境部署

```bash
# 构建应用
npm run build

# 启动生产服务器
npm run start
```

## 📱 使用示例

### 通过对话修改 WiFi 名称

用户: "把 WiFi 名称改为 MyHomeNetwork"
AI 响应: "好的，我会将 WiFi SSID 修改为 MyHomeNetwork。正在应用更改..."

### 调整 WiFi 安全设置

用户: "提高 WiFi 安全性，使用 WPA2 加密"
AI 响应: "我将配置 WiFi 使用 WPA2-PSK 加密模式，这是当前家庭网络推荐的安全标准。正在更新配置..."

### 修改多个参数

用户: "把 WiFi 改为 5GHz，信道设为 36，并隐藏 SSID"
AI 响应: "好的，我会进行以下更改:

1. 将 WiFi 频段切换到 5GHz
2. 设置信道为 36
3. 启用 SSID 隐藏功能
   正在应用更改..."
