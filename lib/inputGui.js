//Входные данные
var names_firms, criteries, vesovoi_koef, allbo, citem;
window.onload = function()
{
   document.getElementById("startin").innerHTML = "<span>Колличество пунктов = </span><input type='number' value='5' id='itemin'><input type='button' value='OK' onclick=\"setDataName();\"><br />";
};

function setDataName()
{
   tmpCont = "";
   citem = document.getElementById('itemin').value;
   for (var i = 0; i < citem; i++)
   {
      tmpCont += "<input type='text' class='cona'>";
   }
   tmpCont += "<input type='button' value='SAVE' onclick='sendToSave(1);'>";
   document.getElementById("in").innerHTML = tmpCont;
}

function setDataCritVes()
{
   tmpCont = "<table id='tabcrit'><tr><th>Критерии</th><th>Весовой коэффицент</th></tr>";
   citem = document.getElementById('itemin').value;
   for (var i = 0; i < citem; i++)
   {
      tmpCont += "<tr><td><input type='text' class='cocr'></td><td><input type='number' class='cove'></td></tr>";
   }
   tmpCont += "</table><br /><input type='button' value='SAVE' onclick='sendToSave(2);'>";
   document.getElementById("in").innerHTML = tmpCont;
}

function sendToSave(what_send)
{
   switch (what_send) {
      case 1:
      names_firms = saveItemsName("cona");
      document.getElementById("startin").innerHTML = "<span>Колличество критериев = </span><input type='number' value='5' id='itemin'><input type='button' value='OK' onclick=\"setDataCritVes(document.getElementById('itemin').value);\"><br />";
      document.getElementById("in").innerHTML = "";
      break
      case 2:
      criteries = saveItemsName("cocr");
      vesovoi_koef = saveItemsName("cove");
      document.getElementById("startin").innerHTML = "";
      document.getElementById("in").innerHTML = "";
      setBO();
      break
   }
}

function saveItemsName(class_name)
{
   fill_array = [];
   for (var i = 0; i < citem; i++)
   {
      fill_array[i] = document.getElementsByClassName(class_name)[i].value; 
   }
   return fill_array;
}

function setBO()
{
   tmpCont = "";
   for (var i = 0; i < criteries.length; i++)
   {
      tmpCont += "<h2>" + criteries[i] + "</h2><table class='tabbo'><tr><th></th>";
      for (var ii = 0; ii < names_firms.length; ii++)
      {
         tmpCont += "<th>" + names_firms[ii] + "</th>";
      }
      tmpCont += "</tr>";
      for (var ii = 0; ii < names_firms.length; ii++)
      {
         tmpCont += "<tr><th>" + names_firms[ii] + "</th>";
         for (var iii = 0; iii < names_firms.length; iii++)
         {
            tmpCont += "<td>";
            if ( iii == ii)
            {
               tmpCont += "<input type='text' value='0' class='bornone' maxlength='1' readonly>";
            }
            else
            {
               tmpCont += "<input type='text' value='' class='bornone' maxlength='1'>";
            }
            tmpCont += "</td>";
         }
         tmpCont += "</tr>";
      }
      tmpCont += "</table><br />";
   }
   tmpCont += "<input type='button' value='Подсчитать' onclick='readAndGoMaster();'><br />";
   document.getElementById("in").innerHTML += tmpCont;
   for (var i = 0; i < vesovoi_koef.length; i++)
   {
      vesovoi_koef[i] = parseFloat(vesovoi_koef[i]);
   }
}
function readAndGoMaster()
{
   allbo = [];
   for (var i = 0; i < criteries.length; i++)
   {
      allbo[i] = [];
      for (var ii = 0; ii < names_firms.length; ii++)
      {
         allbo[i][ii] = [];
         for (var iii = 0; iii < names_firms.length; iii++)
         {
            allbo[i][ii][iii] = parseInt(document.getElementsByClassName("bornone")[iii + (ii * names_firms.length) + (i * names_firms.length * names_firms.length)].value);
         }
      }
   }
   master();
}