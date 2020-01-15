import React, { useEffect, useState } from 'react';
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api"
import DevItem from "./components/DevItem"
import DevForm from "./components/DevForm"

function App() {


const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/devs");
      console.log(res.data);
      setDevs(res.data)
    }
    console.log("loading devs...");
    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const res = await api.post("/devs", data
    );
    setDevs([...devs, res.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleAddDev} />

      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev.github_username}/>
          ))}
        </ul>

      </main>
    </div >
  )
}

export default App;
