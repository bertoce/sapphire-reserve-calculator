import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Plane, Car } from 'lucide-react';

const SapphireReserveROICalculator = () => {
  const [inputs, setInputs] = useState({
    chaseTravel: 0,
    flightsHotels: 0,
    dining: 0,
    otherSpending: 0,
    travelCreditUsage: 300,
    editStaysValue: 0,
    stubhubSpending: 0,
    diningCredit: 300,
    dashpassUsage: 12,
    restaurantOrders: false,
    nonRestaurantOrders: false,
    lyftRides: 0,
    pelotonMembership: false,
    pelotonEquipment: 0,
    appleServices: false,
    priorityPassVisits: 0,
    globalEntryValue: false,
    useShopsCredit: false,
    useSouthwestCredit: false,
    useIHGDiamond: false,
    useSouthwestAList: false
  });

  const [results, setResults] = useState({
    totalValue: 0,
    totalCost: 795,
    roi: 0,
    minROI: 0,
    maxROI: 0,
    breakdown: {}
  });

  const totalAnnualSpending = inputs.chaseTravel + inputs.flightsHotels + inputs.dining + inputs.otherSpending;
  const qualifiesForHighSpender = totalAnnualSpending >= 75000;

  const calculateROI = () => {
    let totalValue = 0;
    let minValue = 0;
    let maxValue = 0;
    let breakdown = {};

    const pointValueMin = 0.015;
    const pointValueMax = 0.020;
    const pointValueAvg = 0.0175;

    const totalPoints = (inputs.chaseTravel * 8) + (inputs.flightsHotels * 4) + (inputs.dining * 3) + (inputs.otherSpending * 1);
    const pointsValue = totalPoints * pointValueAvg;

    breakdown.points = {
      value: pointsValue,
      min: totalPoints * pointValueMin,
      max: totalPoints * pointValueMax,
      details: totalPoints.toLocaleString() + ' points earned'
    };

    const travelCredit = Math.min(inputs.travelCreditUsage, 300);
    breakdown.travelCredit = {
      value: travelCredit,
      min: travelCredit,
      max: travelCredit,
      details: '$' + travelCredit + ' travel credit used'
    };

    const diningCreditValue = Math.min(inputs.diningCredit, 300);
    breakdown.diningCredit = {
      value: diningCreditValue,
      min: diningCreditValue,
      max: diningCreditValue,
      details: '$' + diningCreditValue + ' annual dining credit'
    };

    const editCredit = Math.min(inputs.editStaysValue, 500);
    if (editCredit > 0) {
      breakdown.editCredit = {
        value: editCredit,
        min: editCredit,
        max: editCredit,
        details: '$' + editCredit + ' Edit stays credit'
      };
    }

    const stubhubCredit = Math.min(inputs.stubhubSpending, 300);
    if (stubhubCredit > 0) {
      breakdown.stubhubCredit = {
        value: stubhubCredit,
        min: stubhubCredit,
        max: stubhubCredit,
        details: '$' + stubhubCredit + ' StubHub credit'
      };
    }

    const dashpassValue = inputs.dashpassUsage * 9.99;
    if (dashpassValue > 0) {
      breakdown.dashpass = {
        value: dashpassValue,
        min: dashpassValue * 0.5,
        max: dashpassValue,
        details: inputs.dashpassUsage + ' months of DashPass'
      };
    }

    const restaurantCredits = (inputs.restaurantOrders ? 1 : 0) * 5 * 12;
    const nonRestaurantCredits = (inputs.nonRestaurantOrders ? 2 : 0) * 10 * 12;
    const totalDoorDashCredits = restaurantCredits + nonRestaurantCredits;
    if (totalDoorDashCredits > 0) {
      breakdown.doorDashCredits = {
        value: totalDoorDashCredits,
        min: totalDoorDashCredits * 0.7,
        max: totalDoorDashCredits,
        details: 'DoorDash credits: $' + totalDoorDashCredits + '/year'
      };
    }

    const lyftCredits = Math.min(inputs.lyftRides * 10, 120);
    const lyftBonusPoints = inputs.lyftRides * 20 * 4;
    const lyftTotal = lyftCredits + (lyftBonusPoints * pointValueAvg);
    if (lyftTotal > 0) {
      breakdown.lyft = {
        value: lyftTotal,
        min: lyftCredits + (lyftBonusPoints * pointValueMin),
        max: lyftCredits + (lyftBonusPoints * pointValueMax),
        details: 'Lyft credits and bonus points'
      };
    }

    let pelotonValue = 0;
    if (inputs.pelotonMembership) {
      pelotonValue += 120;
    }
    if (inputs.pelotonEquipment > 0) {
      const bonusPoints = Math.min(inputs.pelotonEquipment, 5000) * 9;
      pelotonValue += bonusPoints * pointValueAvg;
    }
    if (pelotonValue > 0) {
      breakdown.peloton = {
        value: pelotonValue,
        min: pelotonValue * 0.8,
        max: pelotonValue * 1.2,
        details: 'Peloton benefits'
      };
    }

    const priorityPassValue = inputs.priorityPassVisits * 35;
    if (priorityPassValue > 0) {
      breakdown.priorityPass = {
        value: priorityPassValue,
        min: priorityPassValue * 0.5,
        max: priorityPassValue * 1.5,
        details: inputs.priorityPassVisits + ' lounge visits'
      };
    }

    const globalEntryValue = inputs.globalEntryValue ? 24 : 0;
    if (globalEntryValue > 0) {
      breakdown.globalEntry = {
        value: globalEntryValue,
        min: globalEntryValue,
        max: globalEntryValue,
        details: 'Global Entry credit ($120 every 5 years)'
      };
    }

    const appleServicesValue = inputs.appleServices ? (6.99 + 10.99) * 12 : 0;
    if (appleServicesValue > 0) {
      breakdown.appleServices = {
        value: appleServicesValue,
        min: appleServicesValue * 0.3,
        max: appleServicesValue,
        details: 'Apple TV+ and Apple Music'
      };
    }

    let highSpenderValue = 0;
    if (qualifiesForHighSpender) {
      if (inputs.useShopsCredit) highSpenderValue += 250;
      if (inputs.useSouthwestCredit) highSpenderValue += 500;
      if (inputs.useIHGDiamond) highSpenderValue += 200;
      if (inputs.useSouthwestAList) highSpenderValue += 150;
    }
    
    if (highSpenderValue > 0) {
      breakdown.highSpender = {
        value: highSpenderValue,
        min: highSpenderValue * 0.8,
        max: highSpenderValue * 1.2,
        details: 'High spender benefits: $' + highSpenderValue + ' selected'
      };
    }

    const benefitValues = Object.values(breakdown);
    totalValue = benefitValues.reduce((sum, benefit) => sum + benefit.value, 0);
    minValue = benefitValues.reduce((sum, benefit) => sum + benefit.min, 0);
    maxValue = benefitValues.reduce((sum, benefit) => sum + benefit.max, 0);

    const roi = ((totalValue - 795) / 795) * 100;
    const minROI = ((minValue - 795) / 795) * 100;
    const maxROI = ((maxValue - 795) / 795) * 100;

    setResults({
      totalValue,
      totalCost: 795,
      roi,
      minROI,
      maxROI,
      breakdown
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    if (['chaseTravel', 'flightsHotels', 'dining', 'otherSpending'].includes(field)) {
      value = Number(value) || 0;
    }
    
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Header */}
      <div className="border-b-8" style={{ borderColor: '#48D629' }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-6xl font-bold text-black mb-4">SAPPHIRE RESERVE</h1>
          <h2 className="text-2xl text-black">ROI CALCULATOR</h2>
          <div className="mt-8 p-4 bg-black text-white">
            <p className="text-sm leading-relaxed">
              EXISTING CARDHOLDERS ONLY / NO SIGN-UP BONUSES INCLUDED
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* Input Column 1 */}
          <div className="space-y-8">
            {/* Spending Section */}
            <div>
              <div className="h-3 mb-6" style={{ backgroundColor: '#2948D6' }}></div>
              <h3 className="text-xl font-bold text-black mb-6">ANNUAL SPENDING</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">CHASE TRAVEL (8X)</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.chaseTravel}
                      onChange={(e) => handleInputChange('chaseTravel', e.target.value)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">FLIGHTS & HOTELS (4X)</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.flightsHotels}
                      onChange={(e) => handleInputChange('flightsHotels', e.target.value)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">DINING (3X)</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.dining}
                      onChange={(e) => handleInputChange('dining', e.target.value)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">OTHER (1X)</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.otherSpending}
                      onChange={(e) => handleInputChange('otherSpending', e.target.value)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-black text-white">
                <div className="text-2xl font-bold">${totalAnnualSpending.toLocaleString()}</div>
                <div className="text-sm">TOTAL ANNUAL SPENDING</div>
                {qualifiesForHighSpender && (
                  <div className="mt-2 text-sm" style={{ color: '#48D629' }}>
                    ✓ HIGH SPENDER QUALIFIED
                  </div>
                )}
              </div>
            </div>

            {/* High Spender Benefits */}
            {qualifiesForHighSpender && (
              <div>
                <div className="h-3 mb-6" style={{ backgroundColor: '#D62948' }}></div>
                <h3 className="text-xl font-bold text-black mb-6">HIGH SPENDER BENEFITS</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'useShopsCredit', label: '$250 SHOPS CREDIT', value: '$250' },
                    { key: 'useSouthwestCredit', label: '$500 SOUTHWEST CREDIT', value: '$500' },
                    { key: 'useIHGDiamond', label: 'IHG DIAMOND STATUS', value: '$200' },
                    { key: 'useSouthwestAList', label: 'SOUTHWEST A-LIST', value: '$150' }
                  ].map(benefit => (
                    <div key={benefit.key} className="flex items-center justify-between p-4 border-2 border-black">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={inputs[benefit.key]}
                          onChange={(e) => handleInputChange(benefit.key, e.target.checked)}
                          className="w-5 h-5 mr-4"
                          style={{ accentColor: '#D62948' }}
                        />
                        <span className="text-sm font-bold">{benefit.label}</span>
                      </div>
                      <span className="text-sm font-bold">{benefit.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Column 2 */}
          <div className="space-y-8">
            {/* Travel Benefits */}
            <div>
              <div className="h-3 mb-6" style={{ backgroundColor: '#48D629' }}></div>
              <h3 className="text-xl font-bold text-black mb-6">TRAVEL BENEFITS</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">TRAVEL CREDIT</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.travelCreditUsage}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleInputChange('travelCreditUsage', Math.min(300, value));
                      }}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="300"
                    />
                  </div>
                  <div className="text-xs mt-1">MAX $300</div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">DINING CREDIT</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.diningCredit}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleInputChange('diningCredit', Math.min(300, value));
                      }}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="300"
                    />
                  </div>
                  <div className="text-xs mt-1">MAX $300</div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">EDIT STAYS</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.editStaysValue}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleInputChange('editStaysValue', value);
                      }}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">STUBHUB</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.stubhubSpending}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleInputChange('stubhubSpending', value);
                      }}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">PRIORITY PASS VISITS</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">#</div>
                    <input
                      type="text"
                      value={inputs.priorityPassVisits}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleInputChange('priorityPassVisits', value);
                      }}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center p-4 border-2 border-black">
                <input
                  type="checkbox"
                  checked={inputs.globalEntryValue}
                  onChange={(e) => handleInputChange('globalEntryValue', e.target.checked)}
                  className="w-5 h-5 mr-4"
                  style={{ accentColor: '#48D629' }}
                />
                <span className="text-sm font-bold">GLOBAL ENTRY CREDIT</span>
              </div>
            </div>

            {/* Service Benefits */}
            <div>
              <div className="h-3 mb-6" style={{ backgroundColor: '#2948D6' }}></div>
              <h3 className="text-xl font-bold text-black mb-6">SERVICES</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">DASHPASS MONTHS</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">#</div>
                    <input
                      type="text"
                      value={inputs.dashpassUsage}
                      onChange={(e) => handleInputChange('dashpassUsage', Math.min(12, Number(e.target.value) || 0))}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="12"
                    />
                  </div>
                  <div className="text-xs mt-1">MAX 12</div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">LYFT RIDES/MONTH</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">#</div>
                    <input
                      type="text"
                      value={inputs.lyftRides}
                      onChange={(e) => handleInputChange('lyftRides', Number(e.target.value) || 0)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">PELOTON EQUIPMENT</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-12 h-full bg-black text-white flex items-center justify-center text-xl font-bold">$</div>
                    <input
                      type="text"
                      value={inputs.pelotonEquipment}
                      onChange={(e) => handleInputChange('pelotonEquipment', Number(e.target.value) || 0)}
                      className="w-full pl-16 pr-4 py-4 text-xl font-bold bg-white border-2 border-black focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                {[
                  { key: 'restaurantOrders', label: '$5 DOORDASH RESTAURANT CREDIT' },
                  { key: 'nonRestaurantOrders', label: '$20 DOORDASH NON-RESTAURANT CREDIT' },
                  { key: 'pelotonMembership', label: '$120 PELOTON MEMBERSHIP' },
                  { key: 'appleServices', label: '$215 APPLE SERVICES' }
                ].map(service => (
                  <div key={service.key} className="flex items-center p-4 border-2 border-black">
                    <input
                      type="checkbox"
                      checked={inputs[service.key]}
                      onChange={(e) => handleInputChange(service.key, e.target.checked)}
                      className="w-5 h-5 mr-4"
                      style={{ accentColor: '#2948D6' }}
                    />
                    <span className="text-sm font-bold">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-8">
            {/* ROI Analysis */}
            <div>
              <div className="h-3 mb-6" style={{ backgroundColor: '#D62948' }}></div>
              <h3 className="text-xl font-bold text-black mb-6">ROI ANALYSIS</h3>
              
              <div className="bg-black text-white p-8 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white pb-2">
                    <span>ANNUAL FEE</span>
                    <span className="text-xl font-bold">-$795</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white pb-2">
                    <span>BENEFIT VALUE</span>
                    <span className="text-xl font-bold">${results.totalValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white pb-4">
                    <span>NET VALUE</span>
                    <span className={`text-xl font-bold ${results.totalValue - 795 > 0 ? 'text-white' : 'text-red-400'}`}>
                      ${(results.totalValue - 795).toFixed(0)}
                    </span>
                  </div>
                  <div className="text-center pt-4">
                    <div className="text-sm mb-2">RETURN ON INVESTMENT</div>
                    <div className="text-5xl font-bold" style={{ color: results.roi > 0 ? '#48D629' : '#D62948' }}>
                      {results.roi.toFixed(1)}%
                    </div>
                    <div className="text-xs mt-2">
                      RANGE: {results.minROI.toFixed(1)}% TO {results.maxROI.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">BREAKDOWN</h3>
              <div className="space-y-2">
                {Object.entries(results.breakdown).map(([key, benefit]) => (
                  <div key={key} className={`flex justify-between items-center p-3 ${key === 'highSpender' ? 'bg-black text-white' : 'border border-black'}`}>
                    <div>
                      <div className="font-bold text-sm">
                        {key === 'highSpender' ? 'HIGH SPENDER' : key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                      </div>
                      <div className="text-xs opacity-75">{benefit.details}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${benefit.value.toFixed(0)}</div>
                      <div className="text-xs opacity-75">
                        ${benefit.min.toFixed(0)}-${benefit.max.toFixed(0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-8">
              {results.roi > 0 ? (
                <div className="p-8 text-center" style={{ backgroundColor: '#48D629' }}>
                  <div className="text-3xl font-bold text-black mb-4">RECOMMENDED</div>
                  <div className="text-lg font-bold text-black">
                    POSITIVE ROI: KEEP THE CARD
                  </div>
                  <div className="text-sm text-black mt-2">
                    NET BENEFIT: ${(results.totalValue - 795).toFixed(0)}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center" style={{ backgroundColor: '#D62948' }}>
                  <div className="text-3xl font-bold text-white mb-4">NOT RECOMMENDED</div>
                  <div className="text-lg font-bold text-white">
                    NEGATIVE ROI: CONSIDER ALTERNATIVES
                  </div>
                  <div className="text-sm text-white mt-2">
                    NET LOSS: ${Math.abs(results.totalValue - 795).toFixed(0)}
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Notes */}
            <div className="mt-8 p-6 bg-black text-white">
              <h4 className="font-bold mb-3">NOTES</h4>
              <div className="text-xs space-y-1 leading-relaxed">
                <div>• EXISTING CARDHOLDERS ONLY</div>
                <div>• POINT VALUES: 1.5-2.0¢ VIA CHASE TRAVEL</div>
                <div>• HIGH SPENDER: $75K+ ANNUAL SPENDING</div>
                <div>• ACTUAL VALUE VARIES BY USAGE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapphireReserveROICalculator;