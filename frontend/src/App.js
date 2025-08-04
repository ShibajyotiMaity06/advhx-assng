import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';


const Sidebar = () => (
  <aside style={{
    minHeight: '100vh', width: 80, background: 'linear-gradient(180deg,#223b63,#2d8af1 80%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 36, gap: 34
  }}>
    
    <div title="Dashboard" style={{ fontSize: 26, color: '#90caf9', cursor: 'pointer' }}>🏠</div>
    <div title="Machines" style={{ fontSize: 26, color: '#90caf9', cursor: 'pointer' }}>💡</div>
    <div title="Jobs" style={{ fontSize: 26, color: '#90caf9', cursor: 'pointer' }}>📝</div>
    <div title="Alerts" style={{ fontSize: 26, color: '#90caf9', cursor: 'pointer' }}>⚠️</div>
    <div style={{ flex: 1 }} />
    <div title="Settings" style={{ fontSize: 26, color: '#90caf9', cursor: 'pointer', marginBottom: 18 }}>⚙️</div>
    <div title="Profile" style={{ fontSize: 28, color: '#fff', marginBottom: 10 }}>👷‍♂️</div>
  </aside>
);


const NavBar = () => (
  <nav style={{
    background: 'linear-gradient(90deg, #2c5364, #203a43, #0f2027)',
    padding: 20, color: '#fff', fontWeight: 700,
    letterSpacing: 2, display: 'flex', alignItems: 'center'
  }}>
    <div style={{ fontSize: 24, marginRight: 32 }}>
      ADVHX Dashboard
    </div>
    <div style={{ flex: 1 }} />
    <span style={{ opacity: .6, fontWeight: 400, fontSize: 16 }}>Operator Portal</span>
  </nav>
);

function formatTime(t) {
  const h = Math.floor(t / 3600).toString().padStart(2, '0');
  const m = Math.floor((t % 3600) / 60).toString().padStart(2, '0');
  const s = (t % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const AccordionJob = ({ job, open, onToggle, timer, timerRunning, onStart, onStop }) => (
  <div style={{
    marginBottom: 18, borderRadius: 12, overflow: 'hidden',
    boxShadow: open
      ? '0 4px 24px 0 #4dd0e11a'
      : '0 2px 12px 0 #89f7fe22, 0 0px 4px 0 #2221',
    background: open ? 'linear-gradient(90deg,#a8ff78 0%, #78ffd6 100%)' :
              'linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)',
    transition: 'all .2s'
  }}>
    <div
      onClick={onToggle}
      style={{
        cursor: 'pointer',
        padding: 22,
        background: open ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.07)',
        fontSize: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}
    >
      <span>🔹 <b>{job.partName}</b> <span style={{ fontWeight: 400, fontSize: 14, color: '#3337' }}>&nbsp;({job.machineName})</span></span>
      <span style={{ fontSize: 14, color: '#2227', fontWeight: 500 }}>Job ID: {job.id}</span>
    </div>
    {open && (
      <div style={{ padding: '18px 32px 22px 32px', transition: 'all .2s', background: '#fff8' }}>
        <div style={{ fontSize: 16, lineHeight: '28px' }}>
          <div><b>Part Name:</b> {job.partName}</div>
          <div><b>Machine Name:</b> {job.machineName}</div>
          <div><b>Job ID:</b> {job.id}</div>
          <div style={{ margin: '16px 0', fontSize: 28 }}>
            <span role="img" aria-label="timer" style={{ marginRight: 10, fontSize: 26 }}>⏱</span>
            {formatTime(timer)}
          </div>
        </div>
        {!timerRunning
          ? <button
              onClick={onStart}
              style={{
                background: 'linear-gradient( #38ef7d 100%)',
                color: 'black', border: 'none', padding: '10px 28px',
                borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #22aa5577'
              }}>Start Job</button>
          : <button
              onClick={onStop}
              style={{
                background: 'linear-gradient(90deg,rgb(238, 9, 9) 0%, #ff6a00 100%)',
                color: '#fff', border: 'none', padding: '10px 28px',
                borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 12px 0 #ff980077'
              }}>Stop Job</button>
        }
      </div>
    )}
  </div>
);

const CompletedJobsAccordion = ({ completed }) => (
  <div style={{
    marginTop: 38, borderRadius: 12,
    background: 'linear-gradient(90deg, #f9ffce 0%, #f7e8d6 100%)',
    boxShadow: '0 2px 18px 0 #eefaa9a0'
  }}>
    <div style={{ padding: 22, fontSize: 22, fontWeight: 700, color: '#777222' }}>
      🏁 Completed Jobs
    </div>
    <div style={{ padding: 16, background: '#fff6', minHeight: 80 }}>
      {completed.length === 0
        ? <div style={{ color: '#aaa', fontStyle: 'italic' }}>No completed jobs yet.</div>
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff9' }}>
            <thead>
              <tr>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>Job ID</th>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>Part Name</th>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>Machine</th>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>Start Time</th>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>End Time</th>
                <th style={{ padding: 8, textAlign: 'left', color: '#555', fontWeight: 500 }}>Duration</th>
              </tr>
            </thead>
            <tbody>
            {completed.map(job => (
              <tr key={job.id + job.stopTime}>
                <td style={{ padding: 8 }}>{job.id}</td>
                <td style={{ padding: 8 }}>{job.partName}</td>
                <td style={{ padding: 8 }}>{job.machineName}</td>
                <td style={{ padding: 8 }}>{new Date(job.startTime).toLocaleTimeString()}</td>
                <td style={{ padding: 8 }}>{new Date(job.stopTime).toLocaleTimeString()}</td>
                <td style={{ padding: 8, color: '#11998e', fontWeight: 600 }}>{formatTime(Math.floor(job.durationMs / 1000))}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )
      }
    </div>
  </div>
);

const API = "https://advhx-assng-e5y5.vercel.app/";

function App() {
  const [jobs, setJobs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [timers, setTimers] = useState([0,0,0]);
  const [timerRunning, setTimerRunning] = useState([false,false,false]);
  const [intervalId, setIntervalId] = useState([null,null,null]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    axios.get(API + '/jobcards').then(r => {
      setJobs(r.data.slice(0,3));
      setTimers(Array(r.data.slice(0,3).length).fill(0));
      setTimerRunning(Array(r.data.slice(0,3).length).fill(false));
      setOpenIndex(null);
    });
    fetchCompletedJobs();
   
  }, []);

  const fetchCompletedJobs = async () => {
    const res = await axios.get(API + '/jobs/completed');
    setCompletedJobs(res.data);
    let total = 0;
    res.data.forEach(j => { total += (typeof j.durationMs === 'number' ? j.durationMs : 0) });
    setTotalTime(Math.floor(total / 1000));
  };

  const handleToggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  const handleStart = async idx => {
    const job = jobs[idx];
    await axios.post(API + '/jobs/start', { jobId: job.id });
    const newRunning = timerRunning.map((v, i) => i === idx ? true : false);
    setTimerRunning(newRunning);

    const newIntervals = [...intervalId];
    newIntervals[idx] = setInterval(() => {
      setTimers(tt => tt.map((v,i) => i===idx ? v+1 : v));
    }, 1000);
    setIntervalId(newIntervals);
  };

  const handleStop = async idx => {
    const job = jobs[idx];
    await axios.post(API + '/jobs/stop', { jobId: job.id });
    timerRunning[idx] && clearInterval(intervalId[idx]);
    const newRunning = timerRunning.map((v, i) => i === idx ? false : v);
    setTimerRunning(newRunning);
    setTimers(timers.map((v, i) => i === idx ? 0 : v));
    fetchCompletedJobs();
  };

  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div style={{ flex: 1, minHeight: '100vh', background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'}}>
        <NavBar />
        <div style={{
          maxWidth: 980, margin: '36px auto 0 auto', borderRadius: 18,
          background: '#fff', padding: '32px 40px 44px 40px', boxShadow: '0 4px 64px 0 #b3ffe28a'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 28, marginBottom: 38}}>
            <div>
              <h1 style={{
                fontSize: 30, fontWeight: 700, margin: 0,
                background: 'linear-gradient(90deg,#11998e,#38ef7d 80%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                👷🏻 Factory Job Tracker
              </h1>
              <small style={{color:'#aaa'}}>Manage jobs assigned to each machine efficiently.</small>
            </div>
            
            <div style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: 32
            }}>
              <div style={{background:'#f4faff', padding:'18px 25px', borderRadius:12, boxShadow: '0 2px 12px 0 #a0e1f0a5', textAlign:'center'}}>
                <div style={{fontWeight:700, color:'#1976d2', fontSize:18, marginBottom:5}}>
                  <span role="img" aria-label="pie">📊</span> Machines Score
                </div>
                <PieChart percent={80} />
                <div style={{fontSize:13, color:'#888', marginTop:6}}>Dummy Effectiveness</div>
              </div>
              <div style={{background:'#fff4e6', padding:'18px 28px', borderRadius:12, boxShadow: '0 2px 12px 0 #f7c884a0', minWidth:142}}>
                <div style={{fontWeight:700, color:'#d2691e', fontSize:18, marginBottom:4}}>
                  <span role="img" aria-label="clock">⏲️</span> Total Time
                </div>
                <div style={{
                  fontSize: 24, fontWeight: 600,
                  color:'#ef6c00',marginTop:10
                }}>{formatTime(totalTime)}</div>
                <div style={{fontSize:13, color:'#888', marginTop:6}}>All jobs</div>
              </div>
            </div>
          </div>
          

          {jobs.map((job, idx) => (
            <AccordionJob
              key={job.id}
              job={job}
              open={openIndex === idx}
              onToggle={() => handleToggle(idx)}
              timer={timers[idx]}
              timerRunning={timerRunning[idx]}
              onStart={() => handleStart(idx)}
              onStop={() => handleStop(idx)}
            />
          ))}
          <CompletedJobsAccordion completed={completedJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;
