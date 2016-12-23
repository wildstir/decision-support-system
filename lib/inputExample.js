//Входные данные
var names_firms  = [ "Head", "Gnu", "Nitro", "Forum", "Ride" ];
var criteries    = [ "Наименьшая Цена", "Жёсткость", "Форма", "Стиль", "Структура" ];
var vesovoi_koef = [ 0.1, 0.3, 0.3, 0.1, 0.2];
var allbo        = [
                   [ [0, 0, 1, 1, 1], [1, 0, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 1, 0] ],
                   [ [0, 1, 0, 0, 1], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [0, 1, 0, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 0, 1], [1, 1, 1, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [1, 1, 0, 0, 0] ],
                   [ [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1], [1, 1, 0, 0, 1], [1, 1, 0, 0, 0] ]
                   ];
//Запустить с входными данными, только из example.html
window.onload = function()
{
//Добавление всех критериев на страницу
   for (var i = 0; i < criteries.length; i++)
   {
      document.getElementById("in").innerHTML += "<h2>" + criteries[i] + "</h2><div class='cont'></div><br />";
   }

//Вывод первоначальных данных на страницу
   for (var i = 0; i < vesovoi_koef.length; i++)
   {
      tmpCont += "<table><tr><th></th>";
      for (var j = 0; j < names_firms.length; j++)
      {
         tmpCont += "<th>" + names_firms[j] + "</th>";
      }
      tmpCont += "</tr><tr>";
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         tmpCont += "<tr>";
         tmpCont += "<th>" + names_firms[ii] + "</th>"
         for (var iii = 0; iii < allbo[i][ii].length; iii++)
         {
            tmpCont += "<td>" + allbo[i][ii][iii] + "</td>";
         }
         tmpCont += "</tr>";
      }
      tmpCont += "</table>";
      document.getElementsByClassName("cont")[i].innerHTML = tmpCont;
      tmpCont = "";
   }
   master();
};
//Всё