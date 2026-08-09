/**
 * sync-to-icloud.js
 * 将源码同步到 iCloud，自动编号（序号 + 日期 + 时间）
 */

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, 'output', 'lc_cost_calculator.html');
const ICLOUD_DIR  = path.join(process.env.HOME, 'Library/Mobile Documents/com~apple~CloudDocs', '金融工具');
const VERSION_FILE = path.join(ICLOUD_DIR, '.version');

// 确保目录存在
fs.mkdirSync(ICLOUD_DIR, { recursive: true });

// 读取当前版本号
let version = 1;
if (fs.existsSync(VERSION_FILE)) {
  version = parseInt(fs.readFileSync(VERSION_FILE, 'utf-8').trim(), 10) || 0;
  version += 1;
}

// 生成文件名
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}`;
const seq = String(version).padStart(3, '0');
const filename = `国内信用证融资成本计算器_源码_v${seq}_${dateStr}_${timeStr}.html`;

// 复制
const dest = path.join(ICLOUD_DIR, filename);
fs.copyFileSync(SOURCE_FILE, dest);

// 写入版本号
fs.writeFileSync(VERSION_FILE, String(version), 'utf-8');

console.log(`[iCloud] v${seq} 已同步 → ${filename}`);
console.log(`[iCloud] 目录: ${ICLOUD_DIR}`);
