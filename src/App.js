import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceDetection from '@tensorflow-models/face-detection';
import '@tensorflow/tfjs-backend-webgl';
import { drawRect } from './utilities';
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Función para cargar el modelo y detectar rostros
  const runFaceDetection = async () => {
    // Crea un detector para el modelo MediaPipeFaceDetector
    const model = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
      runtime: 'tfjs', // O usa 'mediapipe' según tu preferencia
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection', // Necesario solo si usas runtime: 'mediapipe'
      modelType: 'short', // Puedes elegir entre 'short' y 'full'
      maxFaces: 10,
      inputResolution: { width: 640, height: 480 },
      iouThreshold: 0.3,
      scoreThreshold: 0.75,
    });

    // Intervalo para detectar rostros constantemente
    setInterval(() => {
      detect(model);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // Make Detections
      const face = await net.estimateFaces(video);
      console.log("face", face);

      // Get canvas context
      const ctx = canvasRef.current.getContext('2d');
      requestAnimationFrame(() => {
        drawRect(face, ctx, videoWidth, videoHeight);
      });
    }
  };

  runFaceDetection();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
