import React, { useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from './icons';

interface DistanceCalculatorProps {
    onDistanceCalculated: (distance: number) => void;
}

// Mock API function to simulate calculating distance
const calculateRouteDistance = (waypoints: string[], isRoundTrip: boolean): Promise<number> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const validWaypoints = waypoints.filter(wp => wp.trim() !== '');
            if (validWaypoints.length < 2) {
                // Not enough points to form a route
                resolve(0);
                return;
            }

            let totalDistance = 0;
            // Calculate distance between each pair of waypoints
            for (let i = 0; i < validWaypoints.length - 1; i++) {
                // Simulate a random distance between 50 and 400 km for each leg
                totalDistance += Math.floor(Math.random() * 351) + 50;
            }

            if (isRoundTrip) {
                totalDistance *= 2;
            }
            
            resolve(Math.round(totalDistance));
        }, 1000); // Simulate network delay
    });
};

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({ onDistanceCalculated }) => {
    const [waypoints, setWaypoints] = useState(['', '']);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);

    const handleWaypointChange = (index: number, value: string) => {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = value;
        setWaypoints(newWaypoints);
    };

    const addWaypoint = () => {
        setWaypoints([...waypoints, '']);
    };

    const removeWaypoint = (index: number) => {
        if (waypoints.length <= 2) return;
        const newWaypoints = waypoints.filter((_, i) => i !== index);
        setWaypoints(newWaypoints);
    };

    const handleCalculate = async () => {
        setIsLoading(true);
        setCalculatedDistance(null);
        const distance = await calculateRouteDistance(waypoints, isRoundTrip);
        setCalculatedDistance(distance);
        onDistanceCalculated(distance);
        setIsLoading(false);
    };
    
    const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

    return (
        <div className="p-4 border-t-2 border-amber-200/80 mt-4 space-y-4 bg-amber-50/30 rounded-lg">
            <h4 className="font-semibold text-stone-700">Route Distance Planner</h4>
            <div className="space-y-3">
                {waypoints.map((waypoint, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder={index === 0 ? 'Start from...' : (index === waypoints.length - 1 ? 'Go to...' : 'Then go to...')}
                            value={waypoint}
                            onChange={(e) => handleWaypointChange(index, e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm text-sm focus:ring-amber-500 focus:border-amber-500"
                        />
                        {waypoints.length > 2 && (
                            <button onClick={() => removeWaypoint(index)} className="text-stone-400 hover:text-red-600">
                                <MinusCircleIcon className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between gap-4">
                 <button onClick={addWaypoint} className="flex items-center gap-1 text-sm text-amber-800 hover:text-amber-900 font-medium">
                    <PlusCircleIcon className="w-5 h-5" /> Add Stop
                </button>
                <div className="flex items-center">
                    <input
                        id="roundTrip"
                        type="checkbox"
                        checked={isRoundTrip}
                        onChange={(e) => setIsRoundTrip(e.target.checked)}
                        className="h-4 w-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="roundTrip" className="ml-2 block text-sm text-stone-700">
                        Round Trip
                    </label>
                </div>
            </div>
            
            <button
                onClick={handleCalculate}
                disabled={isLoading}
                className="w-full bg-amber-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-900 transition-colors disabled:bg-stone-400"
            >
                {isLoading ? 'Calculating...' : 'Calculate Distance'}
            </button>
            
            {calculatedDistance !== null && !isLoading && (
                 <p className="text-center text-sm text-stone-600 font-medium">
                    Estimated Route Distance: <span className="text-lg font-bold text-amber-900">{formatNumber(calculatedDistance)} km</span>. This has been updated in the trip details.
                </p>
            )}
        </div>
    );
};

export default DistanceCalculator;