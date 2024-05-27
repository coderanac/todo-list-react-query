import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./Pages/TodoPage";
import TodoRQPage from "./Pages/TodoRQPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/react" element={<TodoPage />} />
        <Route path="/react-query" element={<TodoRQPage />} />
      </Routes>
    </Router>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
