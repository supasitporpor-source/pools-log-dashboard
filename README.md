# Product Logs Dashboard - Next.js Version 🚀

Dashboard สำหรับแสดงผล Product Logs ที่สร้างด้วย Next.js 15, TypeScript และ Tailwind CSS

## ✨ Features

- 🔥 **Next.js 15** - App Router, Server Components
- 📘 **TypeScript** - Type safety ทั้งระบบ
- 🎨 **Tailwind CSS** - Modern styling framework
- 📊 **Real-time Dashboard** - อัปเดตข้อมูลอัตโนมัติทุก 30 วินาที
- 📈 **Live Statistics** - แสดงจำนวน Success, Failed, Running และ Total
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- 🔄 **Auto Refresh** - รีเฟรชข้อมูลอัตโนมัติ
- 👁️ **Detail Modal** - ดูรายละเอียดแบบ JSON
- 🌐 **Thai Language** - Interface เป็นภาษาไทยทั้งหมด
- ⚡ **Custom Hooks** - Clean architecture ด้วย React Hooks
- 🧩 **Component-based** - Modular และ Reusable components

## 🏗️ Project Structure

```
product-logs-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── StatsCard.tsx       # Statistics card component
│   │   └── LogsTable.tsx       # Logs table with modal
│   ├── hooks/
│   │   └── useProductLogs.ts   # Custom hook for API calls
│   └── types/
│       └── index.ts            # TypeScript interfaces
```

## 🚀 การติดตั้งและใช้งาน

### 1. เข้าไปในโฟลเดอร์โปรเจค
```bash
cd product-logs-dashboard
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. แก้ไข API URL
แก้ไขไฟล์ `src/hooks/useProductLogs.ts`:
```typescript
const API_URL = 'https://your-actual-domain.vercel.app/api/product-logs';
```

### 4. รันโปรเจค
```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## 📋 API Requirements

API ต้องส่งข้อมูลในรูปแบบ:

```typescript
interface ApiResponse {
  success: boolean;
  data: ProductLog[];
  count: number;
}

interface ProductLog {
  id: number;
  product_pool_data_generation_job_id: number;
  status: string;
  description: string;
  detail: any | null;
  started_at: string; // ISO date string
  ended_at: string; // ISO date string
  time_used: string; // decimal as string
}
```

## 🎨 Components

### StatsCard
แสดงสถิติแต่ละประเภท (Success, Failed, Running, Total)

### LogsTable
ตารางแสดงข้อมูล logs พร้อม modal สำหรับดู detail

### useProductLogs Hook
Custom hook สำหรับ:
- Fetch ข้อมูลจาก API
- Auto refresh ทุก 30 วินาที
- คำนวณสถิติ
- Error handling

## 🔧 Customization

### เปลี่ยนเวลา Auto Refresh
แก้ไขใน `src/hooks/useProductLogs.ts`:
```typescript
// เปลี่ยนจาก 30000 (30 วินาที) เป็นค่าที่ต้องการ
const interval = setInterval(fetchLogs, 30000);
```

### เปลี่ยนสี Theme
แก้ไข Tailwind classes ใน components:
- Primary: `blue-600`
- Success: `green-600`
- Error: `red-600`
- Warning: `yellow-600`

## 📦 Build และ Deploy

### Build สำหรับ Production
```bash
npm run build
```

### Deploy บน Vercel
```bash
npm run deploy
```

หรือเชื่อมต่อ GitHub repository กับ Vercel

## 🛠️ Available Scripts

- `npm run dev` - รัน development server
- `npm run build` - build สำหรับ production
- `npm run start` - รัน production server
- `npm run lint` - รัน ESLint

## 🌟 ข้อดีของ Next.js Version

- **Performance**: Server-side rendering และ optimization
- **SEO**: Better SEO support
- **Type Safety**: TypeScript ทั้งระบบ
- **Developer Experience**: Hot reload, error handling
- **Scalability**: Easy to extend และ maintain
- **Modern Stack**: ใช้เทคโนโลยีล่าสุด

พร้อมใช้งานแล้ว! 🎉