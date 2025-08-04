import React from 'react';


function msToTime(duration) {
  let sec = Math.floor((duration / 1000) % 60);
  let min = Math.floor((duration / (1000 * 60)) % 60);
  let hr = Math.floor(duration / (1000 * 60 * 60));
  return [hr, min, sec].map(v => v.toString().padStart(2, '0')).join(':');
}

function CompletedJobs({ completedJobs }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3>Completed Jobs</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#e1e1e1' }}>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>Job ID</th>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>Part Name</th>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>Machine</th>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>Start Time</th>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>End Time</th>
            <th style={{ padding: 8, border: '1px solid #bbb' }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {completedJobs.length === 0 && (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 16 }}>No jobs completed yet.</td></tr>
          )}
          {completedJobs.map(job => (
            <tr key={`${job.jobId}-${job.stopTime}`}>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{job.id}</td>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{job.partName}</td>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{job.machineName}</td>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{new Date(job.startTime).toLocaleString()}</td>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{new Date(job.stopTime).toLocaleString()}</td>
              <td style={{ padding: 8, border: '1px solid #bbb' }}>{msToTime(job.durationMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedJobs;
