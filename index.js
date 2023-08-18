const WheatherPlugin = (function () {

  class WheatherWidget {
    constructor(city) {
      this.city = city;
    }

    getWeather() {
      document.body.append(document.createElement("div"));
      document.body.getElementsByTagName("div")[document.body.getElementsByTagName("div").length - 1].id = "container";
      const container = document.getElementById("container");
      container.classList.add("w-container");

      container.append(document.createElement("div"));
      container.getElementsByTagName("div")[container.getElementsByTagName("div").length - 1].id = "box";
      const box = document.getElementById("box");
      box.classList.add("w-container__box");
      box.classList.add("minimal");

      box.append(document.createElement("img"));
      box.getElementsByTagName("img")[box.getElementsByTagName("img").length - 1].id = "btn-show";
      const btnShow = document.getElementById("btn-show");
      btnShow.src = "assets/img/eye.svg";
      btnShow.title = "закрепить/открепить";
      btnShow.alt = "Глаз";
      btnShow.classList.add("w-container__box_eye");
      btnShow.addEventListener("click", () => { box.classList.toggle("minimal"); });

      box.append(document.createElement("h3"));
      box.getElementsByTagName("h3")[box.getElementsByTagName("h3").length - 1].id = "temp";
      const temp = document.getElementById("temp");

      box.append(document.createElement("p"));
      box.getElementsByTagName("p")[box.getElementsByTagName("p").length - 1].id = "info";
      const info = document.getElementById("info");

      box.append(document.createElement("img"));
      box.getElementsByTagName("img")[box.getElementsByTagName("img").length - 1].id = "img-wheather";
      const wheatherImage = document.getElementById("img-wheather");
      wheatherImage.title = "Погода сейчас";
      wheatherImage.alt = "Погода";

      box.append(document.createElement("div"));
      box.getElementsByTagName("div")[box.getElementsByTagName("div").length - 1].id = "wheather-optional";
      const wheatherOptional = document.getElementById("wheather-optional");
      wheatherOptional.classList.add("w-container__box_optional");
      wheatherOptional.classList.add("unvisible");

      box.append(document.createElement("img"));
      box.getElementsByTagName("img")[box.getElementsByTagName("img").length - 1].id = "img-load";
      const loadImage = document.getElementById("img-load");
      loadImage.alt = "Загрузка";
      loadImage.src = "assets/img/load.gif";
      loadImage.classList.add("w-container__box_loading");
      loadImage.classList.add("unvisible");

      box.append(document.createElement("img"));
      box.getElementsByTagName("img")[box.getElementsByTagName("img").length - 1].id = "img-optional";
      const btnOptional = document.getElementById("img-optional");
      btnOptional.classList.add("w-container__box_btn-optional");
      btnOptional.src = "assets/img/temp.svg";
      btnOptional.alt = "Термометр";
      btnOptional.title = "Погода на 3 дня";
      btnOptional.addEventListener("click", () => {
        loadImage.classList.remove("unvisible");
        fetchAsyncOptional();
        wheatherOptional.classList.toggle("unvisible");
      });


      const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));
      const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ this.city + "&appid=8df969c981b9d89adc75be353e575c89&lang=ru&units=metric";

      fetchAsync();
      setInterval( ()=>{ fetchAsync(); }, 1000);
      async function fetchAsync() {
        try {
          await delay(0);
          const response = await fetch(apiUrl);
          const data = await response.json();
          temp.textContent = (data.main.temp).toFixed(1) + " °";
          info.textContent = "Погода (" + data.name + "): " + data.weather[0].description + ", ветер: " + (data.wind.speed).toFixed(1) + " м/с";
          wheatherImage.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; 
        } catch (error) {
          console.error("Error: ", error);
        } finally {}
      }


      const apiUrlOptional = "http://api.openweathermap.org/data/2.5/forecast?q="+ this.city + "&appid=8df969c981b9d89adc75be353e575c89&lang=ru&units=metric";

      async function fetchAsyncOptional() {
        try {
          await delay(1000);
          loadImage.classList.add("unvisible");
          const response = await fetch(apiUrlOptional);
          const data = await response.json();
          wheatherOptional.innerHTML = (data.list[11].dt_txt).slice(0,10) + ":" + "<span>" + (data.list[11].main.temp).toFixed(1) + "° " + "</span>" + (data.list[19].dt_txt).slice(0,10) + ": <span>" + (data.list[19].main.temp).toFixed(1) + "°</span>" + (data.list[27].dt_txt).slice(0,10) + ": <span>" + (data.list[27].main.temp).toFixed(1) + "°</span>";
          console.log("Wheather optional:", data);
        } catch (error) {
          console.error("Error: ", error);
        } finally {}
      }

    }
  }

  return {

    start: function() {
      let wheather = new WheatherWidget("Minsk").getWeather();
    }

  }
})();
