import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMockData = (days) => {
  const bodyMetrics = [];
  const mindMetrics = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    const systolic = Math.floor(Math.random() * (130 - 110) + 110);
    const diastolic = Math.floor(Math.random() * (85 - 70) + 70);
    
    bodyMetrics.unshift({
      date: dateString,
      bloodPressureSystolic: systolic,
      bloodPressureDiastolic: diastolic,
      bloodPressure: `${systolic}/${diastolic}`,
      heartRate: Math.floor(Math.random() * (80 - 60) + 60),
      bodyFat: Number((Math.random() * (25 - 18) + 18).toFixed(1)),
      skeletalMuscle: Number((Math.random() * (45 - 35) + 35).toFixed(1)),
      bloodDiagnostics: Math.floor(Math.random() * (100 - 80) + 80),
    });

    mindMetrics.unshift({
      date: dateString,
      sleepQuality: Math.floor(Math.random() * (10 - 5) + 5),
      cognitiveScore: Math.floor(Math.random() * (100 - 80) + 80),
      meditationMinutes: Math.floor(Math.random() * (30 - 5) + 5),
      stressLevel: Math.floor(Math.random() * (10 - 1) + 1),
      mood: Math.floor(Math.random() * (10 - 5) + 5),
    });
  }
  return { bodyMetrics, mindMetrics };
};

const mockData = {
  ...generateMockData(14),
  upcomingAppointments: [
    { date: '2023-08-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Annual Checkup' },
    { date: '2023-09-01', time: '2:00 PM', doctor: 'Dr. Johnson', type: 'Dental Cleaning' },
  ],
  medicationSchedule: [
    { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily' },
    { name: 'Omega-3', dosage: '1000 mg', frequency: 'Twice daily' },
  ],
};

const softColors = {
  blue: '#63B3ED',
  green: '#68D391',
  pink: '#F687B3',
  purple: '#B794F4',
  teal: '#4FD1C5',
  orange: '#F6AD55',
  indigo: '#7F9CF5',
  red: '#FC8181',
};

const HealthMetricCard = ({ title, value, color }) => (
  <div style={{
    backgroundColor: color,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}>
    <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>{title}</h3>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
  </div>
);

const BodyMindChart = ({ data, metrics }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Metrics Over Time (Last 14 Days)</h3>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="date" 
          stroke="#718096"
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <YAxis stroke="#718096" />
        <Tooltip 
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          formatter={(value, name, props) => [value.toFixed(2), name]}
        />
        {metrics.map((metric) => (
          <Line 
            key={metric.key} 
            type="monotone" 
            dataKey={metric.key} 
            stroke={metric.color} 
            strokeWidth={2}
            dot={false} 
            name={metric.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AppointmentsCard = ({ appointments }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Upcoming Appointments</h3>
    {appointments.map((apt, index) => (
      <div key={index} style={{ marginBottom: '8px' }}>
        <p style={{ fontWeight: 'bold' }}>{apt.date} - {apt.time}</p>
        <p>{apt.doctor} - {apt.type}</p>
      </div>
    ))}
  </div>
);

const MedicationCard = ({ medications }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>Medication Schedule</h3>
    {medications.map((med, index) => (
      <div key={index} style={{ marginBottom: '8px' }}>
        <p style={{ fontWeight: 'bold' }}>{med.name}</p>
        <p>{med.dosage} - {med.frequency}</p>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('BODY');

  const bodyMetrics = [
    { title: "Blood Pressure", value: mockData.bodyMetrics[13].bloodPressure, color: softColors.red, key: 'bloodPressureSystolic' },
    { title: "Heart Rate", value: `${mockData.bodyMetrics[13].heartRate} bpm`, color: softColors.pink, key: 'heartRate' },
    { title: "Body Fat", value: `${mockData.bodyMetrics[13].bodyFat}%`, color: softColors.orange, key: 'bodyFat' },
    { title: "Skeletal Muscle", value: `${mockData.bodyMetrics[13].skeletalMuscle}%`, color: softColors.green, key: 'skeletalMuscle' },
    { title: "Blood Diagnostics", value: `${mockData.bodyMetrics[13].bloodDiagnostics}/100`, color: softColors.blue, key: 'bloodDiagnostics' },
  ];

  const mindMetrics = [
    { title: "Sleep Quality", value: `${mockData.mindMetrics[13].sleepQuality}/10`, color: softColors.indigo, key: 'sleepQuality' },
    { title: "Cognitive Score", value: `${mockData.mindMetrics[13].cognitiveScore}/100`, color: softColors.purple, key: 'cognitiveScore' },
    { title: "Meditation", value: `${mockData.mindMetrics[13].meditationMinutes} min`, color: softColors.teal, key: 'meditationMinutes' },
    { title: "Stress Level", value: `${mockData.mindMetrics[13].stressLevel}/10`, color: softColors.pink, key: 'stressLevel' },
    { title: "Mood", value: `${mockData.mindMetrics[13].mood}/10`, color: softColors.green, key: 'mood' },
  ];

  const bodyChartMetrics = [
    { key: 'bloodPressureSystolic', name: 'Blood Pressure (Systolic)', color: softColors.red },
    { key: 'bloodPressureDiastolic', name: 'Blood Pressure (Diastolic)', color: softColors.orange },
    { key: 'heartRate', name: 'Heart Rate', color: softColors.pink },
    { key: 'bodyFat', name: 'Body Fat', color: softColors.orange },
    { key: 'skeletalMuscle', name: 'Skeletal Muscle', color: softColors.green },
    { key: 'bloodDiagnostics', name: 'Blood Diagnostics', color: softColors.blue },
  ];

  const mindChartMetrics = mindMetrics.map(metric => ({
    key: metric.key,
    name: metric.title,
    color: metric.color,
  }));

  return (
    <div style={{ padding: '24px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>John Doe, 35</h2>
          <p style={{ color: '#4a5568' }}>Revivo Vitality Tracker</p>
        </div>
        <div>
          <button
            onClick={() => setActiveTab('BODY')}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              backgroundColor: activeTab === 'BODY' ? softColors.blue : 'white',
              color: activeTab === 'BODY' ? 'white' : softColors.blue,
              border: `1px solid ${softColors.blue}`,
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            BODY
          </button>
          <button
            onClick={() => setActiveTab('MIND')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'MIND' ? softColors.green : 'white',
              color: activeTab === 'MIND' ? 'white' : softColors.green,
              border: `1px solid ${softColors.green}`,
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            MIND
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {(activeTab === 'BODY' ? bodyMetrics : mindMetrics).map((metric, index) => (
          <HealthMetricCard 
            key={index} 
            title={metric.title} 
            value={metric.value} 
            color={metric.color}
          />
        ))}
      </div>

      <BodyMindChart 
        data={activeTab === 'BODY' ? mockData.bodyMetrics : mockData.mindMetrics}
        metrics={activeTab === 'BODY' ? bodyChartMetrics : mindChartMetrics}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <AppointmentsCard appointments={mockData.upcomingAppointments} />
        <MedicationCard medications={mockData.medicationSchedule} />
      </div>
    </div>
  );
};

export default Dashboard;