// // check compatibility
if (!("BarcodeDetector" in window)) {
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector
  const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
}

// check supported types
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
  supportedFormats.forEach((format) => console.log(format));
});

const codeFormats = [
  "code_128_reader",
  "code_39_reader",
  "code_93_reader",
  "ean_reader",
  "upc_e_reader",
];

// Request access to the webcam stream
let stream = null;

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (s) {
    stream = s;
    // Create a new QuaggaJS barcode scanner instance
    Quagga.init(
      {
        numOfWorkers: 4,
        frequency: 10,
        locate: true,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            facingMode: "environment", // or user
            frameRate: 10,
          },
        },
        decoder: {
          readers: codeFormats,
        },
        locator: {
          patchSize: "medium", // x-small, small, medium, large, x-large
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        // Start the barcode scanner
        Quagga.start();
      }
    );

    // Listen for barcode scans and log the output to the console
    Quagga.onDetected(function (data) {
      console.log(
        "Barcode detected and processed : [" + data.codeResult.code + "]",
        data
      );
    });
  })
  .catch(function (err) {
    console.log(err);
  });

// Stop the QuaggaJS scanner and release the camera stream when the window is closed or reloaded
window.addEventListener("beforeunload", function () {
  if (stream) {
    Quagga.stop();
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
});
