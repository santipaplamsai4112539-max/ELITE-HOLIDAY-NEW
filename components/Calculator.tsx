
import React, { useState, useMemo } from 'react';
import { 
    ONE_DAY_TRIP_RATE, 
    CHARTER_RATE_PER_DAY, 
    DAILY_KM_LIMIT, 
    EXTRA_KM_RATE, 
    DEFAULT_FUEL_PRICE,
    DEFAULT_KM_PER_LITER,
    DRIVER_COST_PER_DAY,
    BUTLER_COST_PER_DAY,
    REFRESHMENTS_COST_PER_DAY,
    INSURANCE_COST_PER_PERSON_PER_DAY,
    DEFAULT_PASSENGERS,
    MAINTENANCE_FEE_SINGLE_DAY,
    MAINTENANCE_FEE_MULTI_DAY
} from '../constants';
import { RouteIcon } from './icons';
import DistanceCalculator from './DistanceCalculator';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  min?: number;
  step?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, unit, min = 0, step = 1 }) => (
    <div>
        {label && <label className="block text-sm font-medium text-stone-600 mb-2">{label}</label>}
        <div className="relative">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Math.max(min, parseFloat(e.target.value) || 0))}
                min={min}
                step={step}
                className="w-full pl-4 pr-16 py-3 bg-white border border-stone-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 transition text-center text-lg"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-stone-500">{unit}</span>
        </div>
    </div>
);


const Calculator: React.FC = () => {
    const [days, setDays] = useState(1);
    const [distance, setDistance] = useState(200);
    const [showDistanceCalculator, setShowDistanceCalculator] = useState(false);
    
    // Internal cost parameters
    const [fuelPrice, setFuelPrice] = useState(DEFAULT_FUEL_PRICE);
    const [kmPerLiter, setKmPerLiter] = useState(DEFAULT_KM_PER_LITER);
    const [includeTolls, setIncludeTolls] = useState(false);
    const [tollFee, setTollFee] = useState(0);


    const calculation = useMemo(() => {
        if (days <= 0) return null;

        const isOneDayTrip = days === 1;
        
        // --- Selling Price Calculation ---
        const dailyRate = isOneDayTrip ? ONE_DAY_TRIP_RATE : CHARTER_RATE_PER_DAY;
        const rateType = isOneDayTrip ? '1-Day Trip Rate' : 'Charter Rate';
        const basePrice = days * dailyRate;
        
        const includedDistance = days * DAILY_KM_LIMIT;
        const extraDistance = Math.max(0, distance - includedDistance);
        const extraDistanceCharge = extraDistance * EXTRA_KM_RATE;
        
        const effectiveTollFee = includeTolls ? tollFee : 0;

        const sellingPrice = basePrice + extraDistanceCharge; // Tolls are a pass-through cost, not part of selling price.

        // --- Internal Cost Calculation ---
        const fuelCost = (distance > 0 && kmPerLiter > 0) ? (distance / kmPerLiter) * fuelPrice : 0;
        const staffCost = (DRIVER_COST_PER_DAY + BUTLER_COST_PER_DAY) * days;
        const refreshmentsAndInsuranceCost = (REFRESHMENTS_COST_PER_DAY + (INSURANCE_COST_PER_PERSON_PER_DAY * DEFAULT_PASSENGERS)) * days;
        const maintenanceFee = isOneDayTrip ? MAINTENANCE_FEE_SINGLE_DAY : (MAINTENANCE_FEE_MULTI_DAY * days);

        const totalInternalCost = fuelCost + effectiveTollFee + staffCost + refreshmentsAndInsuranceCost + maintenanceFee;
        
        // --- Profitability Analysis ---
        const totalPriceToCustomer = sellingPrice + effectiveTollFee;
        const grossProfit = totalPriceToCustomer - totalInternalCost;
        const profitMargin = totalPriceToCustomer > 0 ? (grossProfit / totalPriceToCustomer) * 100 : 0;

        return {
            dailyRate,
            rateType,
            basePrice,
            includedDistance,
            extraDistance,
            extraDistanceCharge,
            totalPrice: totalPriceToCustomer,
            effectiveTollFee,
            fuelCost,
            staffCost,
            refreshmentsAndInsuranceCost,
            maintenanceFee,
            totalInternalCost,
            grossProfit,
            profitMargin,
        };
    }, [days, distance, fuelPrice, kmPerLiter, includeTolls, tollFee]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
    };
    
    const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

    const nights = Math.max(0, days - 1);

    return (
        <div className="max-w-4xl mx-auto">
             <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-stone-700 text-sm">
                <ul className="list-inside space-y-1">
                    <li><span className="font-semibold">วัน (Days) • คืน (Nights) • ระยะทางรวมไป–กลับ (TotalKM)</span></li>
                    <li><span className="font-semibold">Special Request (ถ้ามี)</span></li>
                    <li><span className="font-semibold">ค่าน้ำมัน (FuelPrice) • อัตรากินน้ำมัน (KM_per_L)</span></li>
                    <li><span className="font-semibold">ถ้ามีด่านจริง เลือก Include Tolls = Yes แล้วใส่ยอด</span></li>
                </ul>
                <p className="text-xs mt-2 text-stone-500">หมายเหตุ: แบบฟอร์มนี้ใช้สำหรับคำนวณเบื้องต้นเท่านั้น</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 border border-amber-200/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">Trip Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-2">Rental Duration</label>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setDays(d => Math.max(1, d - 1))} className="px-5 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xl font-bold rounded-lg transition">-</button>
                                        <div className="flex-grow text-center border border-stone-300 rounded-lg shadow-sm py-2 bg-white flex justify-center items-center h-full">
                                            <input 
                                                type="number"
                                                value={days}
                                                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                                                min={1}
                                                className="w-16 p-1 text-center text-lg font-semibold focus:outline-none bg-transparent"
                                                aria-label="Number of days"
                                            />
                                            <span className="text-lg text-stone-600">{days > 1 ? 'Days' : 'Day'}</span>
                                            <span className="text-stone-300 mx-2 text-xl">/</span>
                                            <div className="p-1">
                                                <span className="text-lg font-semibold">{nights}</span>
                                                <span className="text-lg text-stone-600 ml-1">{nights === 1 ? 'Night' : 'Nights'}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => setDays(d => d + 1)} className="px-5 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xl font-bold rounded-lg transition">+</button>
                                    </div>
                                </div>
                                <div>
                                    <InputField label="Total Travel Distance" value={distance} onChange={setDistance} unit="km" min={0} step={10} />
                                    <button onClick={() => setShowDistanceCalculator(!showDistanceCalculator)} className="text-sm text-amber-800 hover:text-amber-900 font-medium mt-2 flex items-center gap-1">
                                        <RouteIcon className="w-4 h-4" />
                                        {showDistanceCalculator ? 'Hide' : 'Plan Route to Estimate Distance'}
                                    </button>
                                </div>
                                {showDistanceCalculator && <DistanceCalculator onDistanceCalculated={setDistance} />}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-serif font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4 mt-6">Internal Parameters</h3>
                             <div className="space-y-4">
                                <InputField label="Fuel Price" value={fuelPrice} onChange={setFuelPrice} unit="THB/L" min={0} step={0.1} />
                                <InputField label="Fuel Consumption Rate" value={kmPerLiter} onChange={setKmPerLiter} unit="km/L" min={1} step={0.1} />
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input id="includeTolls" type="checkbox" checked={includeTolls} onChange={(e) => setIncludeTolls(e.target.checked)} className="h-4 w-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"/>
                                        <label htmlFor="includeTolls" className="ml-2 block text-sm font-medium text-stone-700">Include Tolls in Quote</label>
                                    </div>
                                    {includeTolls && <InputField label="Total Toll Fee" value={tollFee} onChange={setTollFee} unit="THB" min={0} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-amber-50/50 rounded-lg p-6 border border-amber-200">
                        <h2 className="text-2xl font-serif font-bold text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">Price Estimate</h2>
                        {calculation ? (
                            <div className="space-y-3 text-stone-700">
                                <div className="flex justify-between items-center"><span>Base Price:</span> <span className="font-semibold">{formatCurrency(calculation.basePrice)}</span></div>
                                {calculation.extraDistance > 0 && <div className="flex justify-between items-center"><span>Extra Distance Charge:</span> <span className="font-semibold">{formatCurrency(calculation.extraDistanceCharge)}</span></div>}
                                {calculation.effectiveTollFee > 0 && <div className="flex justify-between items-center text-sm text-stone-600"><span>Toll Fees (Pass-through):</span> <span className="font-semibold">{formatCurrency(calculation.effectiveTollFee)}</span></div>}
                                <hr className="border-amber-200/60 my-2" />
                                <div className="flex justify-between items-center text-xl font-bold text-amber-900 mt-4"><span>Total Price:</span><span className="text-2xl">{formatCurrency(calculation.totalPrice)}</span></div>
                                
                                <div className="pt-4 mt-4 border-t-2 border-dashed border-amber-300">
                                    <h3 className="text-lg font-serif font-bold text-stone-800 mb-2">Internal Cost & Margin Analysis</h3>
                                    <div className="space-y-2 text-sm">
                                         <div className="flex justify-between"><span>Staff (Driver/Butler):</span> <span>{formatCurrency(calculation.staffCost)}</span></div>
                                         <div className="flex justify-between"><span>Refreshments & Insurance:</span> <span>{formatCurrency(calculation.refreshmentsAndInsuranceCost)}</span></div>
                                         <div className="flex justify-between"><span>Vehicle Maintenance Fee:</span> <span>{formatCurrency(calculation.maintenanceFee)}</span></div>
                                         <div className="flex justify-between"><span>Fuel & Tolls:</span> <span>{formatCurrency(calculation.fuelCost + calculation.effectiveTollFee)}</span></div>
                                         <hr className="border-amber-200 my-1" />
                                         <div className="flex justify-between font-semibold"><span>Total Internal Cost:</span> <span>{formatCurrency(calculation.totalInternalCost)}</span></div>
                                         <hr className="border-amber-200/60 my-1" />
                                         <div className="flex justify-between font-bold text-green-700"><span>Gross Profit:</span> <span>{formatCurrency(calculation.grossProfit)}</span></div>
                                         <div className="flex justify-between font-bold text-green-700"><span>Profit Margin:</span> <span>{calculation.profitMargin.toFixed(2)}%</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-stone-500">Please enter valid trip details.</p>
                        )}
                        <div className="text-xs text-stone-500 mt-6 space-y-2">
                             <p><span className="font-bold">สรุปยอดเสนอขาย (ไม่รวม Exclusive):</span> อิงเรต 21k/19k, รวม {DAILY_KM_LIMIT} กม./วัน, กม.เกินคิด {EXTRA_KM_RATE} ต่อ กม.</p>
                             <p><span className="font-bold">เงื่อนไขสำคัญ:</span> ถ้ามีคำขอพิเศษ โปรดติดต่อ Sales เพื่อทำใบเสนอราคา</p>
                             <p className="text-blue-600"><span className="font-bold">ผู้ใช้ภายใน:</span> ดูต้นทุนภายในเพื่อตรวจมาร์จิ้นก่อนส่งลูกค้า</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
