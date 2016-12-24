"use strict";
var item_names   = [ "Head", "Gnu", "Nitro", "Forum", "Ride" ];
var criterion    = [ "Lowest price", "Rigidity", "Form", "Style", "Structure" ];
var weight_coef  = [ 0.1, 0.3, 0.3, 0.1, 0.2];
var allbo        = [
                   [ [0, 0, 1, 1, 1], [1, 0, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 1, 0] ],
                   [ [0, 1, 0, 0, 1], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [0, 1, 0, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 0, 1], [1, 1, 1, 0, 0] ],
                   [ [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [1, 1, 1, 0, 1], [1, 1, 0, 0, 0] ],
                   [ [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1], [1, 1, 0, 0, 1], [1, 1, 0, 0, 0] ]
                   ];

window.onload = function()
{
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<h2>" + criterion[i] + "</h2><div class='cont'></div>";
   }
   tmpCont += "<h2>Weight coefficient</h2><div id='ves'></div><br />";
   document.getElementById("in").innerHTML = tmpCont;
   for (var i = 0; i < weight_coef.length; i++)
   {
      tmpCont = "<table><tr><th></th>";
      for (var j = 0; j < item_names.length; j++)
      {
         tmpCont += "<th>" + item_names[j] + "</th>";
      }
      tmpCont += "</tr><tr>";
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         tmpCont += "<tr>";
         tmpCont += "<th>" + item_names[ii] + "</th>"
         for (var iii = 0; iii < allbo[i][ii].length; iii++)
         {
            tmpCont += "<td>" + allbo[i][ii][iii] + "</td>";
         }
         tmpCont += "</tr>";
      }
      tmpCont += "</table><br />";
      document.getElementsByClassName("cont")[i].innerHTML = tmpCont;
   }
   tmpCont = "<table>";
   for (var i = 0; i < weight_coef.length; i++)
   {
      tmpCont += "<tr><th>" + criterion[i] + "</th><td>" + weight_coef[i] + "</td></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("ves").innerHTML = tmpCont;
   master();
};