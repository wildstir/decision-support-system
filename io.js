//Входные данные
var names_firms  = [ "Head", "Gnu", "Nitro", "Forum", "Ride" ];
var criteries    = [ "Наименьшая Цена", "Жёсткость", "Форма", "Стиль", "Структура" ];
var vesovoi_koef = [ 0.1, 0.3, 0.3, 0.1, 0.2 ];
var allbo        = [
                   [ [0, 0, 1, 1, 1], [1, 0, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 1, 0] ],
                   [ [0, 1, 0, 0, 1], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [0, 1, 0, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 0, 1], [1, 1, 1, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [1, 1, 0, 0, 0] ],
                   [ [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1], [1, 1, 0, 0, 1], [1, 1, 0, 0, 0] ]
                   ];

//Остальные переменные
var tmpCont      = "";
var bo_vesovoi   = [];
var kmax         = [];
var tmpar        = [];
var tmpcount, tmpvar, vfov, hr, nr, er;

window.onload = function()
{
//Инициализация масива с результами турнирного механизма
   for (var i = 0; i < criteries.length; i++)
   {
      bo_vesovoi[i] = [];
   }
//Инициализация массива с к-максимальными
   for (var i = 0; i < allbo.length; i++)
   {
      kmax[i] = [];
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         kmax[i][ii] = [];
      }
   }
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

//Вывод весовых коэфицентов на страницу
   tmpCont = "<table>";
   for (var i = 0; i < vesovoi_koef.length; i++)
   {
      tmpCont += "<tr><th>" + criteries[i] + "</th><th>" + vesovoi_koef[i] + "</th></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("ves").innerHTML = tmpCont;

//Вывод механизма доминирования
   dominir();
   tmpCont = "<table>";
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont += "<tr><th>" + criteries[i] + "</th><th>" + names_firms[tmpar[i]] + "</th></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("md").innerHTML = tmpCont;
   tmpar = [];

//Вывод механизма блокирования
   blockir();
   tmpCont = "<table>";
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont += "<tr><th>" + criteries[i] + "</th><th>" + names_firms[tmpar[i]] + "</th></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("mb").innerHTML = tmpCont;
   tmpar = [];

//Вывод турнирного механизма
   tyrnir();
   tmpCont = "<table><tr><th></th>";
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont += "<th>" + criteries[i] + "</th>";
   }
   tmpCont += "</tr>";
   for (var i = 0; i < names_firms.length; i++)
   {
      tmpCont += "<tr><th>" + names_firms[i] + "</th>";
      for (var ii = 0; ii < criteries.length; ii++)
      {
         tmpCont += "<td>" + bo_vesovoi[ii][i] + "</td>";
      }
      tmpCont += "</tr>";
   }
   tmpCont += "</table>";
   document.getElementById("tm").innerHTML = tmpCont;
//Вывод турнирного механизма помноженного на весовой коэфицент
   tmpCont = "<table><tr><th></th>";
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont += "<th>" + criteries[i] + "</th>";
   }
   tmpCont += "</tr>";
   for (var i = 0; i < names_firms.length; i++)
   {
      tmpCont += "<tr><th>" + names_firms[i] + "</th>";
      tmpar[i] = 0;
      for (var ii = 0; ii < criteries.length; ii++)
      {
         vforv = parseFloat((bo_vesovoi[ii][i] * vesovoi_koef[ii]).toFixed(5));
         tmpCont += "<td>" + vforv + "</td>";
         tmpar[i] = parseFloat((tmpar[i] + vforv).toFixed(5));//Math.ceil((tmpar[i] + bo_vesovoi[ii][i])*10)/10;
      }
      tmpCont += "</tr>";
   }
   tmpCont += "</table>";
   document.getElementById("vk").innerHTML = tmpCont;

//Вывод суммы из турнирной таблицы помноженой на весовой коэфицент
   tmpCont = "<table>";
   for (var i = 0; i < names_firms.length; i++)
   {
      tmpCont += "<tr><th>" + names_firms[i] + "</th><th>" + tmpar[i] + "</th></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("vs").innerHTML = tmpCont;

   for (var i = 0; i < criteries.length; i++)
   {
      document.getElementById("km").innerHTML += "<h2>" + criteries[i] + "</h2><div class='k'></div><br />";
   }
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont = "<table><tr><th></th><th>K1</th><th>K2</th><th>K3</th><th>K4</th></tr>";
      for (var ii = 0; ii < kmax[i].length; ii++)
      {
         tmpCont += "<tr><th>" + names_firms[ii] + "</th>";
         for (var iii = 0; iii < kmax[i][ii].length; iii++)
         {
            tmpCont += "<td>" + kmax[i][ii][iii] + "</td>";
         }
      }
      document.getElementsByClassName("k")[i].innerHTML = tmpCont;
   }
};

//Механизм доминирования
function dominir()
{
   for (var i = 0; i < criteries.length; i++)
   {
      tmpvar = 0;
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         tmpcount = 0;
         for (var iii = 0; iii < allbo[i][ii].length; iii++)
         {
            tmpcount += allbo[i][ii][iii];
         }
         if (tmpvar < tmpcount)
         {
            tmpvar = tmpcount;
            tmpar[i] = ii;
         }
      }
   }
}

//Механизм блокировки
function blockir()
{
   for (var i = 0; i < criteries.length; i++)
   {
      tmpvar = criteries.length + 1;
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         tmpcount = 0;
         for (var iii = 0; iii < allbo[i][ii].length; iii++)
         {
            tmpcount += allbo[i][iii][ii];
         }
         if (tmpvar > tmpcount)
         {
            tmpvar = tmpcount;
            tmpar[i] = ii;
         }
      }
   }
}

//Турнирный механизм и дополнительно помноженный на на весовой коэфицент
function tyrnir()
{
   for (var i = 0; i < criteries.length; i++)
   {
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         tmpcount = 0;
         hr = nr = er = 0;
         for (var iii = 0; iii < allbo[i][ii].length; iii++)
         {
            if (allbo[i][ii][iii] == 1)
            {
               if (allbo[i][iii][ii] == 1)
               {
                  tmpcount += 0.5;
               }
               else
               {
                  tmpcount += 1;
               }
            }

            if (ii != iii)
            {
               if (allbo[i][ii][iii] == 1)
               {
                  if (allbo[i][iii][ii] == 1)
                  {
                     er += 1;
                  }
                  else
                  {
                     hr += 1;
                  }
               }
               else if (allbo[i][ii][iii] == 0 && allbo[i][iii][ii] == 0)
               {
                  nr += 1;
               }
            }
         }
         bo_vesovoi[i][ii] = tmpcount;

         kmax[i][ii][0] = hr + nr + er;
         kmax[i][ii][1] = hr + nr;
         kmax[i][ii][2] = hr + er;
         kmax[i][ii][3] = hr;
      }
   }
}
