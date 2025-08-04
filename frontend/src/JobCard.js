import React from 'react';

function JobCard({ job, onSelect, selected }) {
  return (
    <div onClick={onSelect}
      style={{
        border: selected ? '2px solid #3498db' : '1px solid #888',
        background: selected ? '#e6f2fa' : '#f9f9f9',
        marginBottom: 10,
        padding: 16,
        borderRadius: 6,
        cursor: 'pointer'
      }}>
      <b>{job.partName}</b>
      <div>ID: {job.id} | Machine: {job.machineName}</div>
    </div>
  );
}

export default JobCard;
