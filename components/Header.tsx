
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-900 tracking-wider">
        ระบบคำนวณราคาเช่ารถบัส (Beta)
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-stone-600">
        ระบุวันเดินทาง ระยะทาง โซน และตัวเลือกเสริม ระบบจะคำนวณราคาตามเรต 21k/19k + ส่วนเพิ่ม และแสดงต้นทุนภายในเพื่อคุมมาร์จิ้น
      </p>
       <p className="mt-2 text-md text-stone-700 font-serif">
        กรอกพารามิเตอร์ด้านล่าง
      </p>
    </header>
  );
};

export default Header;
