
Let me create a comprehensive visualization that helps teams understand how to choose and evaluate processes for automation, using the success criteria and measurement framework from Automatable's example.


Automation Process Assessment Card
Click to open component
I've created an interactive assessment card that helps teams:

Evaluate process suitability for automation using key criteria from the Automatable example
Compare current state metrics with target goals (like Automatable's 15 min → 30 sec improvement)
Calculate an overall automation potential score
The component features:

Process evaluation criteria scoring (frequency, consistency, volume, time investment, bottleneck impact)
Current vs target state metric tracking
Automated scoring calculation with recommendations
Clear visual feedback on automation potential
Teams can use this to:

Score their processes against proven automation criteria
Document current performance metrics
Set clear target goals for improvement
Get immediate feedback on automation potential
Would you like me to explain any particular aspect of the assessment framework in more detail?

Copy
Retry


Claude can make mistakes. Please double-check responses.



No file chosen

3.5 Sonnet

Choose style

Automation Process Assessment Card
Preview
Code

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const AutomationAssessmentCard = () => {
  const [scores, setScores] = useState({
    frequency: 0,
    consistency: 0,
    volume: 0,
    timeInvestment: 0,
    bottleneck: 0
  });

  const [metrics, setMetrics] = useState({
    currentTime: '',
    currentVolume: '',
    currentHours: '',
    targetTime: '',
    targetVolume: '',
    targetHours: ''
  });

  const calculateScore = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    return (total / (Object.keys(scores).length * 5)) * 100;
  };

  const handleScoreChange = (metric, value) => {
    setScores(prev => ({
      ...prev,
      [metric]: parseInt(value)
    }));
  };

  const handleMetricChange = (metric, value) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="bg-blue-50">
        <h2 className="text-2xl font-bold text-blue-900">Process Automation Assessment</h2>
        <p className="text-blue-700">Evaluate your process for automation potential</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Process Evaluation Criteria</h3>
          <div className="grid gap-4">
            {[
              { key: 'frequency', label: 'How frequently is this task performed?' },
              { key: 'consistency', label: 'How consistent are the steps?' },
              { key: 'volume', label: 'What is the volume of instances?' },
              { key: 'timeInvestment', label: 'How much time does it take?' },
              { key: 'bottleneck', label: 'Is this creating a bottleneck?' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <label className="w-1/2 text-gray-700">{label}</label>
                <select 
                  className="w-1/2 p-2 border rounded"
                  value={scores[key]}
                  onChange={(e) => handleScoreChange(key, e.target.value)}
                >
                  <option value="0">Select a score</option>
                  <option value="1">1 - Very Low</option>
                  <option value="2">2 - Low</option>
                  <option value="3">3 - Medium</option>
                  <option value="4">4 - High</option>
                  <option value="5">5 - Very High</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Current vs Target Metrics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Current State</h4>
              <div>
                <label className="block text-sm text-gray-600">Process Time (minutes)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.currentTime}
                  onChange={(e) => handleMetricChange('currentTime', e.target.value)}
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Monthly Volume</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.currentVolume}
                  onChange={(e) => handleMetricChange('currentVolume', e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Monthly Hours</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.currentHours}
                  onChange={(e) => handleMetricChange('currentHours', e.target.value)}
                  placeholder="e.g. 125"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Target State</h4>
              <div>
                <label className="block text-sm text-gray-600">Process Time (minutes)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.targetTime}
                  onChange={(e) => handleMetricChange('targetTime', e.target.value)}
                  placeholder="e.g. 0.5"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Monthly Volume</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.targetVolume}
                  onChange={(e) => handleMetricChange('targetVolume', e.target.value)}
                  placeholder="e.g. 1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Monthly Hours</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={metrics.targetHours}
                  onChange={(e) => handleMetricChange('targetHours', e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Automation Potential Score</h3>
          <div className="text-3xl font-bold text-blue-700">{calculateScore().toFixed(1)}%</div>
          <p className="text-sm text-gray-600 mt-2">
            {calculateScore() >= 80 ? 'Excellent candidate for automation' :
             calculateScore() >= 60 ? 'Good candidate for automation' :
             calculateScore() >= 40 ? 'Potential candidate with some modifications' :
             'May need more analysis before automating'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationAssessmentCard;
