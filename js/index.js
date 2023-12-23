  const sideMenu = document.querySelector("aside");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const darkMode = document.querySelector(".dark-mode");

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDDvrU6sLDBFNpnFKEdoLmacw26ItyyZKs",
    authDomain: "smart-gardent-31211.firebaseapp.com",
    databaseURL: "https://smart-gardent-31211-default-rtdb.firebaseio.com",
    projectId: "smart-gardent-31211",
    storageBucket: "smart-gardent-31211.appspot.com",
    messagingSenderId: "498783498415",
    appId: "1:498783498415:web:f7b119118be0b083bea45a",
    measurementId: "G-M2GZC4P9HZ",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  const auth = firebase.auth();
  menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.style.display = "none";
  });

  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode-variables");
    darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
    darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
  });

  // get temp from firebase
  database.ref("/SG_IoT/tem").on("value", function (snapshot) {
    var tem = snapshot.val();
    document.getElementById("tem").innerHTML = tem;

    // Cập nhật vòng tròn cho Temperature
    const temperatureCircle = document.querySelector(".sales svg circle");
    setCirclePercentage(temperatureCircle, tem); // Sử dụng hàm setCirclePercentage để cập nhật vòng tròn
    updateTemperatureChart(tem);
  });

  // get hum from firebase
  database.ref("/SG_IoT/hum").on("value", function (snapshot) {
    var hum = snapshot.val();
    document.getElementById("hum").innerHTML = hum;

    // Cập nhật vòng tròn cho Humidity
    const humidityCircle = document.querySelector(".visits svg circle");
    setCirclePercentage(humidityCircle, hum); // Sử dụng hàm setCirclePercentage để cập nhật vòng tròn
    updateHumidityChart(hum);
  });

  // get soil from firebase
  database.ref("/SG_IoT/soil").on("value", function (snapshot) {
    var soil = snapshot.val();
    document.getElementById("soil").innerHTML = soil;

    // Cập nhật vòng tròn cho Soil Moisture
    const soilMoistureCircle = document.querySelector(".searches svg circle");
    setCirclePercentage(soilMoistureCircle, soil); // Sử dụng hàm setCirclePercentage để cập nhật vòng tròn
  });

  function setCirclePercentage(circleElement, percent) {
    const radius = circleElement.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    // Điều chỉnh công thức để vòng tròn bắt đầu từ dưới hướng 6h
    const dashOffset = circumference * ((100 - percent) / 100);

    circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
    circleElement.style.strokeDashoffset = dashOffset;
  }

  // Get initial temperature data from Firebase
  // database.ref("/SG_IoT/tem").once("value", function (snapshot) {
  //   const initialTemperature = snapshot.val();
  //   updateTemperatureChart(initialTemperature);

  //   // Listen for changes in temperature and update the chart
  //   database.ref("/SG_IoT/tem").on("value", function (snapshot) {
  //     const newTemperature = snapshot.val();
  //     updateTemperatureChart(newTemperature);
  //   });
  // });
  document.addEventListener("DOMContentLoaded", function () {
    const waterPumpSwitch = document.getElementById("pump");

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    waterPumpSwitch.addEventListener("click", function () {
      const isChecked = this.checked;

      // Lấy giá trị của soil từ Firebase
      database.ref("/SG_IoT/soil").once("value", function (snapshot) {
        const soil = snapshot.val();

        // Kiểm tra nếu soil < 50, không cho phép tắt máy bơm
        if (soil < 30 && !isChecked) {
          alert("Cannot turn off the pump when soil moisture is low!");
          waterPumpSwitch.checked = true; // Giữ máy bơm bật
        } else {
          // Bật hoặc tắt máy bơm dựa trên trạng thái của checkbox
          database.ref("/SG_IoT/pump").set(isChecked ? 1 : 0);
        }
      });
    });

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    database.ref("/SG_IoT/pump").on("value", function (snapshot) {
      const pumpStatus = snapshot.val();

      // Cập nhật trạng thái của input dựa trên trạng thái của máy bơm
      waterPumpSwitch.checked = pumpStatus !== 0;

      // Nếu máy bơm được bật, thêm màu xanh vào input
      if (pumpStatus !== 0) {
        waterPumpSwitch.classList.add("active");
      } else {
        // Nếu máy bơm tắt, xóa màu xanh khỏi input
        waterPumpSwitch.classList.remove("active");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const lightSwitch = document.getElementById("light");

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    lightSwitch.addEventListener("click", function () {
      const isChecked = this.checked;

      // Bật hoặc tắt máy bơm dựa trên trạng thái của checkbox
      database.ref("/SG_IoT/light").set(isChecked ? 1 : 0);
    });

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    database.ref("/SG_IoT/light").on("value", function (snapshot) {
      const lightStatus = snapshot.val();

      // Cập nhật trạng thái của input dựa trên trạng thái của máy bơm
      lightSwitch.checked = lightStatus !== 0;

      // Nếu máy bơm được bật, thêm màu xanh vào input
      if (lightStatus !== 0) {
        lightSwitch.classList.add("active");
      } else {
        // Nếu máy bơm tắt, xóa màu xanh khỏi input
        lightSwitch.classList.remove("active");
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const autoPumpSwitch = document.getElementById("autoPump");

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    autoPumpSwitch.addEventListener("click", function () {
      const isChecked = this.checked;

      // Bật hoặc tắt máy bơm dựa trên trạng thái của checkbox
      database.ref("/SG_IoT/autoPump").set(isChecked ? 1 : 0);
    });

    // Lắng nghe thay đổi trạng thái máy bơm từ Firebase
    database.ref("/SG_IoT/autoPump").on("value", function (snapshot) {
      const autoPumpStatus = snapshot.val();

      // Cập nhật trạng thái của input dựa trên trạng thái của máy bơm
      autoPumpSwitch.checked = autoPumpStatus !== 0;

      // Nếu máy bơm được bật, thêm màu xanh vào input
      if (autoPumpStatus !== 0) {
        autoPumpSwitch.classList.add("active");
      } else {
        // Nếu máy bơm tắt, xóa màu xanh khỏi input
        autoPumpSwitch.classList.remove("active");
      }
    });
  });

  const temperatureChart = new Chart(
    document.getElementById("temperatureChart").getContext("2d"),
    {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Temperature",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    }
  );

  function updateTemperatureChart(temperature) {
    const timestamp = new Date().toLocaleTimeString(); // Lấy thời gian hiện tại

    // Thêm thời gian và nhiệt độ mới vào biểu đồ
    temperatureChart.data.labels.push(timestamp);
    temperatureChart.data.datasets[0].data.push(temperature);

    // Giới hạn số lượng điểm trên biểu đồ để tránh quá tải
    const maxDataPoints = 10;
    if (temperatureChart.data.labels.length > maxDataPoints) {
      temperatureChart.data.labels.shift();
      temperatureChart.data.datasets[0].data.shift();
    }

    // Cập nhật biểu đồ
    temperatureChart.update();
  }

 

  /// login logout

  // //----- Login code start
  // document.getElementById("login").addEventListener("click", function () {
  //   var email = document.getElementById("login_email").value;
  //   var password = document.getElementById("login_password").value;

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user);
  //       alert(user.email + " Login successfully!!!");
  //       document.getElementById("logout").style.display = "block";
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //       alert(errorMessage);
  //     });
  // });
  // //----- End

  // //----- Logout code start
  // document.getElementById("logout").addEventListener("click", function () {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log("Sign-out successful.");
  //       alert("Sign-out successful.");
  //       document.getElementById("logout").style.display = "none";
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log("An error happened.");
  //     });
  // });
  let userCreds = JSON.parse(sessionStorage.getItem("user-cred"));
  let userInfor = JSON.parse(sessionStorage.getItem("user-info"));
  let logoutBtn = document.getElementById("logout");
  let nameA = document.getElementById("adminName");
  let SignOut = () => {
    sessionStorage.removeItem("user-cred");
    sessionStorage.removeItem("user-info");
    window.location.href = "../auth/auth.html";
  };
  let CheckCred = () => {
    if (!sessionStorage.getItem("user-cred")) {
      window.location.href = "../auth/auth.html";
    } else {
      nameA.innerText = userInfor.username;
    }
  };
  window.addEventListener("load", CheckCred);
  logoutBtn.addEventListener("click", SignOut);
