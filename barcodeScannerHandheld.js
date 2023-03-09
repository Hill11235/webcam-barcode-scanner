let form = document.getElementById("hidden-form");
let inp = document.getElementById("scan-input");
let skuBarCode = "T001XPII6E-Y";

form.addEventListener("submit", submitBarcode);

function submitBarcode(event) {
  const barcodeValue = inp.value;
  if (checkValidBarcode(barcodeValue)) {
    console.log(barcodeValue);
  } else {
    console.log("else");
  }

  event.preventDefault();
}

function checkValidBarcode(barcodeValue) {
  // TODO: HANDLE YELLOW AND RED BAR CODES
  return barcodeValue === skuBarCode;
}
