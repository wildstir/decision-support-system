"use strict";
var item_names, criterion, weight_coef, allbo, citem, sumves;
window.onload = function()
{
   document.getElementById("startin").innerHTML = "<span>Number of item: </span><input type='number' value='' placeholder='>1' id='itemin'><input type='button' value='OK' onclick=\"setData(1);\"><br /><br />";
};

function setData(num_iter)
{
   tmpCont = "";
   citem = document.getElementById('itemin').value;
   for (var i = 0; i < citem; i++)
   {
      tmpCont += "<input type='text' placeholder='Name' class='innfcr'>";
   }
   tmpCont += "<br /><br /><input type='button' value='SAVE' onclick='sendToSave(" + num_iter + ");'>";
   document.getElementById("in").innerHTML = tmpCont;
}

function sendToSave(what_send)
{
   switch (what_send) {
      case 1:
      item_names = saveItemsName("Item");
      document.getElementById("startin").innerHTML = "<span>Number of criteria: </span><input type='number' value='' placeholder='>1' id='itemin'><input type='button' value='OK' onclick=\"setData(2);\"><br /><br />";
      document.getElementById("in").innerHTML = "";
      break
      case 2:
      criterion = saveItemsName("Criterion");
      document.getElementById("startin").innerHTML = "";
      document.getElementById("in").innerHTML = "";
      setBO();
      break
   }
}

function saveItemsName(itemorcrit)
{
   var fill_array = [];
   for (var i = 0; i < citem; i++)
   {
      if (document.getElementsByClassName("innfcr")[i].value == "")
      {
         fill_array[i] = itemorcrit + (i + 1); 
      }
      else
      {
         fill_array[i] = document.getElementsByClassName("innfcr")[i].value; 
      }
   }
   return fill_array;
}

function setBO()
{
   tmpCont = "";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<h2>" + criterion[i] + "</h2><table class='tabbo'><tr><th></th>";
      for (var ii = 0; ii < item_names.length; ii++)
      {
         tmpCont += "<th>" + item_names[ii] + "</th>";
      }
      tmpCont += "</tr>";
      for (var ii = 0; ii < item_names.length; ii++)
      {
         tmpCont += "<tr><th>" + item_names[ii] + "</th>";
         for (var iii = 0; iii < item_names.length; iii++)
         {
            tmpCont += "<td>";
            if ( iii == ii)
            {
               tmpCont += "<input type='text' value='0' class='bornone' maxlength='1' readonly>";
            }
            else
            {
               tmpCont += "<input type='text' value='' placeholder='0/1' class='bornone' maxlength='1'>";
            }
            tmpCont += "</td>";
         }
         tmpCont += "</tr>";
      }
      tmpCont += "</table><br />";
   }
   tmpCont += "<h2>Weight coefficient</h2><div id='ves'></div><br />";
   document.getElementById("in").innerHTML += tmpCont;
   tmpCont = "<table id='tabves'>";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<tr><th>" + criterion[i] + "</th><td><input type='text' placeholder='0.1' class='cove'></td></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("ves").innerHTML = tmpCont;
   document.getElementById("in").innerHTML += "<input type='button' value='Decide' onclick='readAndGoMaster();'><br />";
}

function readAndGoMaster()
{
   allbo = [];
   for (var i = 0; i < criterion.length; i++)
   {
      allbo[i] = [];
      for (var ii = 0; ii < item_names.length; ii++)
      {
         allbo[i][ii] = [];
         for (var iii = 0; iii < item_names.length; iii++)
         {
            if (document.getElementsByClassName("bornone")[iii + (ii * item_names.length) + (i * item_names.length * item_names.length)].value == "")
            {
               allbo[i][ii][iii] = 0;
               document.getElementsByClassName("bornone")[iii + (ii * item_names.length) + (i * item_names.length * item_names.length)].value = 0;
            }
            else
            {
               allbo[i][ii][iii] = parseInt(document.getElementsByClassName("bornone")[iii + (ii * item_names.length) + (i * item_names.length * item_names.length)].value);
            }
         }
      }
   }
   weight_coef = [];
   sumves = 0;
   for (var i = 0; i < criterion.length; i++)
   {
      citem = parseFloat(document.getElementsByClassName("cove")[i].value);
      if (!citem)
      {
         citem = 0;
         document.getElementsByClassName("cove")[i].value = 0;
      }
      sumves += citem;
      weight_coef[i] = citem;
   }
   if (sumves == 1) master();
}