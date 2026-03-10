Markdown
Copy
Code
Preview
# OPNet Multisend

Batch token transfer dApp for OPNet Bitcoin L1. Send tokens to up to 100 addresses in one transaction.

## 🚀 Quick Start

### Open in GitHub Codespaces
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/YOUR_USERNAME/opnet-multisend)

### Deploy
1. Go to **Actions** tab
2. Select **Deploy OPNet dApp**
3. Click **Run workflow**
4. Choose network (testnet/mainnet)

## 📁 Structure
contracts/          # AssemblyScript smart contracts
src/               # React frontend
.github/workflows/ # CI/CD automation
plain
Copy

## 🔧 Development
```bash
npm install
npm run dev        # Start dev server
npm run build      # Build for production
npm run compile    # Compile contract
📄 License
MIT
plain
Copy

**Lưu ý:** Thay `YOUR_USERNAME` bằng username GitHub của bạn

**11.4. Click "Commit changes"**

---

## Bước 12: Bật GitHub Pages

**12.1. Vào Settings tab**

**12.2. Ở sidebar bên trái, click "Pages"**

**12.3. Ở mục "Source", chọn:**
- **Deploy from a branch** → chuyển thành **GitHub Actions**

**12.4. Click Save**

---

## Bước 13: Chạy Deploy

**13.1. Vào Actions tab**

**13.2. Click "Deploy OPNet dApp"**

**13.3. Click nút dropdown "Run workflow" màu xanh**

**13.4. Chọn:**
- network: `testnet`

**13.5. Click nút xanh "Run workflow"**

---

## Bước 14: Theo Dõi Deploy

**14.1. Click vào workflow run đang chạy**

**14.2. Đợi các bước hoàn thành:**
- ✅ Checkout
- ✅ Setup Node.js
- ✅ Install dependencies
- ✅ Compile Contract
- ✅ Build Frontend
- ✅ Deploy to GitHub Pages

**14.3. Khi thấy ✅ Deploy to GitHub Pages, click vào để xem URL**

---

## ✅ Hoàn Thành!

Sau 5-10 phút, bạn sẽ có:
- **Frontend:** `https://YOUR_USERNAME.github.io/opnet-multisend/`
- **Contract:** Được compile sẵn trong thư mục `build/`

---

## 🛠️ Test Trên Codespaces (Tùy chọn)

Nếu muốn test trước khi deploy:

**1. Vào Code tab → Click nút xanh "Code" → Codespaces → Create codespace**

**2. Chờ 2-3 phút khởi tạo**

**3. Trong terminal, chạy:**
```bash
npm install
npm run dev
