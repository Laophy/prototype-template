import { useEffect } from "react";

const SteamPlugin = () => {
  useEffect(() => {
    const canvasId = "fake-refresh-steam";

    const createCanvas = () => {
      const canvas = document.createElement("canvas");
      canvas.id = canvasId;
      canvas.width = 1;
      canvas.height = 1;
      Object.assign(canvas.style, {
        position: "fixed",
        top: "0px",
        bottom: "0px",
        pointerEvents: "none",
        zIndex: "30000",
        width: "100vw",
        height: "100vh",
      });
      document.body.appendChild(canvas);
      return canvas;
    };

    const gameLoop = (canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
      ctx.fillRect(0, 0, 1, 1);
      requestAnimationFrame(() => gameLoop(canvas));
    };

    let canvas = document.getElementById(canvasId);
    if (!canvas) {
      canvas = createCanvas();
    }
    gameLoop(canvas);

    return () => {
      if (canvas) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  return null;
};

export default SteamPlugin;
