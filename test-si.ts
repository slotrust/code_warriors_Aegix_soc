import si from 'systeminformation';
si.processes().then(data => {
  console.log(data.list[0]);
});
