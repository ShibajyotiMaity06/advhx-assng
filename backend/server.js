const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './jobs.json';

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/jobcards', (req, res) => {
  const data = readData();
  res.json(data.jobcards);
});

app.post('/jobs/start', (req, res) => {
  const { jobId } = req.body;
  if (!jobId) return res.status(400).json({ message: "Missing jobId" });

  const data = readData();
  if (data.activeJobs.find(j => j.jobId === jobId)) {
    return res.status(400).json({ message: "Job already started" });
  }
  data.activeJobs.push({
    jobId,
    startTime: new Date().toISOString()
  });
  writeData(data);
  res.status(200).json({ message: "Job started" });
});


app.post('/jobs/stop', (req, res) => {
  const { jobId } = req.body;
  if (!jobId) return res.status(400).json({ message: "Missing jobId" });

  const data = readData();
  const activeJobIndex = data.activeJobs.findIndex(j => j.jobId === jobId);
  if (activeJobIndex === -1) {
    return res.status(400).json({ message: "Job is not active" });
  }
  const activeJob = data.activeJobs[activeJobIndex];
  const stopTime = new Date().toISOString();
  const durationMs = new Date(stopTime) - new Date(activeJob.startTime);
  
  const jobInfo = data.jobcards.find(jc => jc.id === jobId);
  data.completedJobs.push({
    ...jobInfo,
    startTime: activeJob.startTime,
    stopTime,
    durationMs
  });
  
  data.activeJobs.splice(activeJobIndex, 1);

  writeData(data);
  res.status(200).json({ message: "Job stopped" });
});


app.get('/jobs/completed', (req, res) => {
  const data = readData();
  res.json(data.completedJobs);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
