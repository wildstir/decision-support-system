"use strict";
var tmpCont      = "";
var bo_weight    = [];
var kmax         = [];
var tmpar        = [];
var tmpcount, tmpvar, vforv, hr, nr, er;

function master() {
   for (var i = 0; i < criterion.length; i++)
   {
      bo_weight[i] = [];
   }
   for (var i = 0; i < allbo.length; i++)
   {
      kmax[i] = [];
      for (var ii = 0; ii < allbo[i].length; ii++)
      {
         kmax[i][ii] = [];
      }
   }
   document.getElementById("out").style.display = "block";
   document.getElementById("md").innerHTML = "";
   document.getElementById("mb").innerHTML = "";
   document.getElementById("tm").innerHTML = "";
   document.getElementById("vk").innerHTML = "";
   document.getElementById("vs").innerHTML = "";
   document.getElementById("km").innerHTML = "";

   dominir();
   tmpCont = "<table>";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<tr><th>" + criterion[i] + "</th><td>" + item_names[tmpar[i]] + "</td></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("md").innerHTML = tmpCont;
   tmpar = [];

   blockir();
   tmpCont = "<table>";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<tr><th>" + criterion[i] + "</th><td>" + item_names[tmpar[i]] + "</td></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("mb").innerHTML = tmpCont;
   tmpar = [];

   tyrnir();
   tmpCont = "<table><tr><th></th>";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<th>" + criterion[i] + "</th>";
   }
   tmpCont += "</tr>";
   for (var i = 0; i < item_names.length; i++)
   {
      tmpCont += "<tr><th>" + item_names[i] + "</th>";
      for (var ii = 0; ii < criterion.length; ii++)
      {
         tmpCont += "<td>" + bo_weight[ii][i] + "</td>";
      }
      tmpCont += "</tr>";
   }
   tmpCont += "</table>";
   document.getElementById("tm").innerHTML = tmpCont;
   tmpCont = "<table><tr><th></th>";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<th>" + criterion[i] + "</th>";
   }
   tmpCont += "</tr>";
   for (var i = 0; i < item_names.length; i++)
   {
      tmpCont += "<tr><th>" + item_names[i] + "</th>";
      tmpar[i] = 0;
      for (var ii = 0; ii < criterion.length; ii++)
      {
         vforv = parseFloat((bo_weight[ii][i] * weight_coef[ii]).toFixed(5));
         tmpCont += "<td>" + vforv + "</td>";
         tmpar[i] = parseFloat((tmpar[i] + vforv).toFixed(5));//Math.ceil((tmpar[i] + bo_weight[ii][i])*10)/10;
      }
      tmpCont += "</tr>";
   }
   tmpCont += "</table>";
   document.getElementById("vk").innerHTML = tmpCont;
   tmpCont = "<table>";
   for (var i = 0; i < item_names.length; i++)
   {
      tmpCont += "<tr><th>" + item_names[i] + "</th><td>" + tmpar[i] + "</td></tr>";
   }
   tmpCont += "</table>";
   document.getElementById("vs").innerHTML = tmpCont;

   tmpCont = "";
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont += "<h2>" + criterion[i] + "</h2><div class='k'></div><br />";
   }
   document.getElementById("km").innerHTML = tmpCont;
   for (var i = 0; i < criterion.length; i++)
   {
      tmpCont = "<table><tr><th></th><th>K1</th><th>K2</th><th>K3</th><th>K4</th></tr>";
      for (var ii = 0; ii < kmax[i].length; ii++)
      {
         tmpCont += "<tr><th>" + item_names[ii] + "</th>";
         for (var iii = 0; iii < kmax[i][ii].length; iii++)
         {
            tmpCont += "<td>" + kmax[i][ii][iii] + "</td>";
         }
      }
      document.getElementsByClassName("k")[i].innerHTML = tmpCont;
   }
}

function dominir()
{
   for (var i = 0; i < criterion.length; i++)
   {
      tmpvar = 0;
      tmpar[i] = 0;
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

function blockir()
{
   for (var i = 0; i < criterion.length; i++)
   {
      tmpvar = criterion.length + 1;
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

function tyrnir()
{
   for (var i = 0; i < criterion.length; i++)
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
         bo_weight[i][ii] = tmpcount;
         kmax[i][ii][0] = hr + nr + er;
         kmax[i][ii][1] = hr + nr;
         kmax[i][ii][2] = hr + er;
         kmax[i][ii][3] = hr;
      }
   }
}
