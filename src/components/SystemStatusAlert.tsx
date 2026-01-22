'use client';

import React, { useState, useEffect } from 'react';
import { ProductLog } from '@/types';

interface SystemStatusAlertProps {
  logs: ProductLog[];
}

const SystemStatusAlert: React.FC<SystemStatusAlertProps> = ({ logs }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // เวลาเป้าหมาย
  const targetTimes = ['08:00', '10:00', '12:00', '14:00', '16:00', '17:00', '19:00', '21:00'];

  // อัปเดตเวลาทุก 1 นาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // ตรวจสอบว่ารายการล่าสุดตรงเงื่อนไขไหม
  const checkLatestLogCondition = (): boolean => {
    if (logs.length === 0) return false;
    
    const latestLog = logs[0]; // รายการแรกคือล่าสุด
    return (
      latestLog.description === 'remaking product_pool_dates' &&
      latestLog.status === 'successful'
    );
  };

  // ตรวจสอบว่าอยู่ในช่วงห้ามไหม
  const checkRestrictedTime = (): { isRestricted: boolean; timeRange?: string } => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    for (const targetTime of targetTimes) {
      const [hour, minute] = targetTime.split(':').map(Number);
      const targetTotalMinutes = hour * 60 + minute;
      
      // ช่วง ±30 นาที
      const startMinutes = targetTotalMinutes - 30;
      const endMinutes = targetTotalMinutes + 30;
      
      if (currentTotalMinutes >= startMinutes && currentTotalMinutes <= endMinutes) {
        // คำนวณช่วงเวลาที่แสดง
        const startHour = Math.floor(startMinutes / 60);
        const startMin = startMinutes % 60;
        const endHour = Math.floor(endMinutes / 60);
        const endMin = endMinutes % 60;
        
        const formatTime = (h: number, m: number) => {
          return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        };
        
        const timeRange = `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`;
        
        return { isRestricted: true, timeRange };
      }
    }
    
    return { isRestricted: false };
  };

  const latestLogValid = checkLatestLogCondition();
  const { isRestricted, timeRange } = checkRestrictedTime();

  // ไม่แสดงอะไรถ้าไม่มี logs
  if (logs.length === 0) {
    return null;
  }

  // แสดงสถานะตามเงื่อนไข
  if (isRestricted) {
    // อยู่ในช่วงห้าม - แสดงข้อความสีแดง
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <i className="fas fa-exclamation-triangle text-red-600 mr-3 text-lg"></i>
          <div>
            <h3 className="text-red-800 font-medium">ระบบกำลังประมวลผลข้อมูล</h3>
            <p className="text-red-700 mt-1">
              ⚠ ขณะนี้อยู่ในช่วงประมวลผลข้อมูล ({timeRange}) กรุณารอสักครู่...
            </p>
          </div>
        </div>
      </div>
    );
  } else if (latestLogValid) {
    // เงื่อนไขผ่านทั้ง 2 ข้อ - แสดงข้อความสีเขียว
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <i className="fas fa-check-circle text-green-600 mr-3 text-lg"></i>
          <div>
            <h3 className="text-green-800 font-medium">ระบบพร้อมใช้งาน</h3>
            <p className="text-green-700 mt-1">
              ✅ ตอนนี้คุณสามารถอัพเดตโปรแกรมได้
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ไม่ตรงเงื่อนไข - ไม่แสดงอะไร
  return null;
};

export default SystemStatusAlert;