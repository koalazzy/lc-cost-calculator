/**
 * publish-github.js
 * 将混淆产物复制到根目录 index.html 并推送到 GitHub Pages
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const DIST_HTML = path.join(ROOT, 'dist', 'lc_cost_calculator.html');
const INDEX_HTML = path.join(ROOT, 'index.html');

try {
  const gh = '/opt/homebrew/bin/gh';

  // 1. 复制混淆产物到根目录
  fs.copyFileSync(DIST_HTML, INDEX_HTML);
  console.log('[GitHub] 已更新 index.html');

  // 2. git add + commit
  execSync('git add index.html .gitignore', { cwd: ROOT, stdio: 'pipe' });

  const now = new Date();
  const ts = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  execSync(`git commit -m "Auto: ${ts}"`, { cwd: ROOT, stdio: 'pipe' });

  // 3. push
  execSync('git push origin main', { cwd: ROOT, stdio: 'pipe' });

  console.log('[GitHub] 已推送到 https://koalazzy.github.io/lc-cost-calculator/');
} catch (e) {
  console.error('[GitHub] 发布失败:', e.stderr?.toString() || e.message);
  process.exit(1);
}
