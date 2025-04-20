// Objek utama kalkulator untuk menyimpan angka yang sedang ditampilkan
const calculator = {
  displayNumber: "0", // Nilai awal tampilan
};

// Fungsi untuk memperbarui tampilan layar kalkulator
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
  autoResizeText(); //  Perkecil font jika overflow
}

// Fungsi untuk menghapus semua input dan mereset ke angka "0"
function clearCalculator() {
  calculator.displayNumber = "0";
  updateDisplay();
}

// Fungsi untuk menghapus 1 digit terakhir dari angka yang ditampilkan
function deleteLastDigit() {
  if (calculator.displayNumber.length > 1) {
    calculator.displayNumber = calculator.displayNumber.slice(0, -1); // Potong karakter terakhir
  } else {
    calculator.displayNumber = "0"; // Jika hanya satu karakter, reset ke "0"
  }
  updateDisplay();
}

// Fungsi untuk memasukkan angka ke layar kalkulator
function inputDigit(digit) {
  // Jika awalnya "0" atau "Error", ganti dengan digit baru
  if (calculator.displayNumber === "0" || calculator.displayNumber === "Error") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit; // Tambahkan digit ke angka saat ini
  }
  updateDisplay();
}

// Fungsi untuk memasukkan titik desimal
function inputDecimal() {
  // Tambahkan titik jika belum ada, atau jika karakter terakhir adalah operator
  if (!calculator.displayNumber.includes(".") || /[\+\-\*\/]$/.test(calculator.displayNumber)) {
    calculator.displayNumber += ".";
  }
  updateDisplay();
}

// Fungsi untuk menangani operator seperti +, -, *, /
function handleOperator(operator) {
  const lastChar = calculator.displayNumber.slice(-1); // Ambil karakter terakhir

  // Jika karakter terakhir adalah operator, ganti dengan yang baru
  if (["+", "-", "*", "/"].includes(lastChar)) {
    calculator.displayNumber = calculator.displayNumber.slice(0, -1) + operator;
  } else {
    calculator.displayNumber += operator; // Tambahkan operator
  }

  updateDisplay();
}

// Fungsi untuk melakukan perhitungan ekspresi
function performCalculation() {
  try {
    // Cek jika terjadi pembagian dengan nol
    if (/\/0(?!\d)/.test(calculator.displayNumber)) {
      calculator.displayNumber = "Error";
    } else {
      const result = eval(calculator.displayNumber); // Hitung ekspresi
      calculator.displayNumber = result.toString(); // Tampilkan hasil
    }
  } catch {
    calculator.displayNumber = "Error"; // Tampilkan error jika ekspresi salah
  }
  updateDisplay();
}

// Ambil semua tombol kalkulator
const buttons = document.querySelectorAll(".button");

// Tambahkan event listener ke setiap tombol kalkulator
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator(); // Jika tombol CE ditekan
      return;
    }
    if (target.classList.contains("delete")) {
      deleteLastDigit(); // Jika tombol DEL ditekan
      return;
    }
    if (target.classList.contains("equals")) {
      performCalculation(); // Jika tombol "=" ditekan
      return;
    }
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText); // Jika operator ditekan
      return;
    }
    if (target.innerText === ".") {
      inputDecimal(); // Jika titik ditekan
      return;
    }
    inputDigit(target.innerText); // Jika angka ditekan
  });
}

// Tambahkan event listener untuk keyboard input
document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    inputDigit(event.key); // Jika angka ditekan
  } else if (event.key === ".") {
    inputDecimal(); // Jika titik ditekan
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    handleOperator(event.key); // Jika operator ditekan
  } else if (event.key === "Enter" || event.key === "=") {
    performCalculation(); // Jika Enter atau = ditekan
  } else if (event.key === "Escape") {
    clearCalculator(); // Jika Esc ditekan
  } else if (event.key === "Backspace") {
    deleteLastDigit(); // Jika Backspace ditekan
  }

  updateDisplay(); // Selalu update tampilan
});

// Efek animasi klik tombol kalkulator (tanpa suara)
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked'); // Tambah kelas animasi
    setTimeout(() => button.classList.remove('clicked'), 150); // Hapus setelah 150ms
  });
});

// Ambil elemen suara klik
const clickSound = document.getElementById("clickSound");

// Tambahkan event listener ke semua tombol agar bisa memutar suara
document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add("clicked"); // Tambah efek klik

    // 🔊 Putar suara klik jika ada
    if (clickSound) {
      clickSound.currentTime = 0; // Mulai dari awal
      clickSound.play(); // Mainkan suara
    }

    setTimeout(() => button.classList.remove("clicked"), 150); // Hapus efek klik
  });
});

function autoResizeText() {
  const display = document.getElementById("displayNumber");
  const length = calculator.displayNumber.length;

  // Atur font-size sesuai panjang angka
  if (length <= 9) {
    display.style.fontSize = "3.5rem"; // ukuran besar
  } else if (length <= 11) {
    display.style.fontSize = "3rem"; // ukuran sedang
  } else if (length <= 15) {
    display.style.fontSize = "2.5rem"; // lebih kecil
  } else {
    display.style.fontSize = "2rem"; // ukuran paling kecil
  }
}


