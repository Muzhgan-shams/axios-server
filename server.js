import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskData = JSON.parse(fs.readFileSync('task.json'));

app.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * taskData.length);
  const randomTask = taskData[randomIndex];
  res.json(randomTask);
});
app.post('/createtask', (req, res) => {
  const newTask = req.body;
  const taskId = Date.now().toString();
  newTask.id = taskId;
  taskData.push(newTask);
  fs.writeFileSync('task.json', JSON.stringify(taskData, null, 2));
  res.send('Task created successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
