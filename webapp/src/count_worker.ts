import { workerData, parentPort } from "worker_threads";

console.log(`Worker thread ${workerData.request} started`);

for (let i = 0; i < workerData.iterations; i++) {
  for (let count = 0; count < workerData.total; count++) {
    count++;
  }
  parentPort?.postMessage(i);
}

console.log(`Worker thread ${workerData.request} finished`);
