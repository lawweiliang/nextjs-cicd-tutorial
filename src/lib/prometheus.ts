import promClient from "prom-client";

// Configure default metrics collection
promClient.collectDefaultMetrics();

// Define a simple custom metric (e.g., a counter for TODOs added)
export const todoCounter = new promClient.Counter({
  name: "todo_app_todos_added_total",
  help: "Total number of TODOs added",
});

export default promClient;
