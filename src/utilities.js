function determinarOrientacion(keypoints) {
  if (!keypoints) {
    return;
  }
  const rightEye = keypoints.find(k => k.name === "rightEye");
  const leftEye = keypoints.find(k => k.name === "leftEye");
  const rightEar = keypoints.find(k => k.name === "rightEarTragion");
  const leftEar = keypoints.find(k => k.name === "leftEarTragion");
  const noseTip = keypoints.find(k => k.name === "noseTip");

  // Diferencia en el nivel Y entre los ojos
  const diferenciaYEntreOjos = Math.abs(rightEye.y - leftEye.y);

  // Distancia horizontal entre los ojos y las orejas
  const distanciaEntreOjos = Math.abs(rightEye.x - leftEye.x);
  const distanciaEntreOrejas = Math.abs(rightEar.x - leftEar.x);

  // Posición del noseTip en relación con los ojos y las orejas
  const noseTipEnCentro = noseTip.x > Math.min(rightEye.x, leftEye.x) && noseTip.x < Math.max(rightEye.x, leftEye.x);

  // Determinar orientación
  if (diferenciaYEntreOjos < 10 && distanciaEntreOjos < distanciaEntreOrejas && noseTipEnCentro) {
    return "Viendo de frente";
  } else {
    return "Viendo de lado";
  }
}


export const drawRect = (faces, ctx, videoWidth, videoHeight) => {
  console.log("faces", faces);
  console.log("keypoints", faces[0]?.keypoints);
  const keypoints = faces[0]?.keypoints;

  const orientacion1 = determinarOrientacion(keypoints);


console.log(orientacion1); // Viendo de lado

  // const guideBox = {
  //   x: videoWidth * 0.15, // Centrar ajustando el inicio en X
  //   y: videoHeight * 0.15, // Centrar ajustando el inicio en Y
  //   width: videoWidth * 0.7, // Hacer el recuadro más ancho
  //   height: videoHeight * 0.7, // Hacer el recuadro más alto
  // };
  // console.log("videoWidth", videoWidth);
  // console.log("videoHeight", videoHeight);
  // ctx.strokeStyle = 'pink';
  // ctx.lineWidth = 4;
  // ctx.rect(guideBox.x, guideBox.y, guideBox.width, guideBox.height);
  // ctx.stroke();  
  faces.forEach(face => {
    // Extraer las coordenadas y dimensiones de la caja
    const xMin = face.box.xMin;
    const yMin = face.box.yMin;
    // Calcular width y height
    // const width = xMax - xMin;
    // const height = yMax - yMin;
    const width = face.box.width;
    const height = face.box.height;

    console.log("xMin", xMin, "yMin", yMin, "width", width, "height", height);

    // Establecer el estilo

    ctx.strokeStyle = "aqua";
    ctx.font = '18px Arial';

    // Dibujar rectángulos y texto
    ctx.beginPath();
    ctx.fillStyle = "aqua";
    ctx.fillText("Face", xMin, yMin);
    ctx.rect(xMin, yMin, width, height);
    ctx.stroke();
  });

}


