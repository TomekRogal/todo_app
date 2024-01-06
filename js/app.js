import React from "react";
import { createRoot } from "react-dom/client";
import {getTasks} from "./tasks";
import Form from "../componenst/Form";
import Tasks from "../componenst/Tasks";
function App() {
  const [refresh, setRefresh] = React.useState(false);
  return (
<div>
  <Form setRefresh={() => setRefresh(prev => !prev)} />
  <Tasks refresh={refresh} setRefresh={setRefresh} />
</div>
  )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
