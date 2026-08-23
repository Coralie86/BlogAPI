import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { wakeUp } from "../services/auth.js";
import style from "../styles/serverWakeUp.module.css"

function ServerWakeUp() {
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    async function checkServer() {
      try {
        const response = await wakeUp()
        
        if (response.status === "ok") {
          navigate("/app");
          return;
        }
      } catch (error) {
        console.log("Server is waking up...");
      }

      timeoutId = setTimeout(checkServer, 2000);
    }

    checkServer();

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className={style.serverLoading}>
      <div className="spinner"></div>

      <h1>Server Waking up</h1>
      <p>Getting things ready...</p>
    </div>
  );
}

export default ServerWakeUp;