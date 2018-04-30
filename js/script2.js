var table = document.getElementById('tblOrder');
var list = document.getElementById('lstProducts');
var qty = document.getElementById('txtQty').value;
function add(){
  var qty = document.getElementById('txtQty').value;
  if (parseFloat(qty) != qty) {
    qty = 1;
  }
  if(checkProd(qty)) {calculate();
checkVis();
  }
  else
    addToCard();
}

function addToCard() {//добавление продукта в корзину
  if (parseFloat(qty) != qty) {
    qty = 1;
  }
  var cost = qty * list.value;
  var row = table.tBodies[0].insertRow(-1);
  row.insertCell(-1).innerHTML = '<input type="checkbox" name="toggle-group">';
  row.insertCell(-1).innerHTML = list.options[list.selectedIndex].text;
  row.insertCell(-1).innerHTML = list.value;
  row.insertCell(-1).innerHTML = qty;
  row.insertCell(-1).innerHTML = cost;
  row.insertCell(-1).innerHTML = '<input type="button" onclick="deleteProduct(this);" value="Удалить">';
  calculate();
  checkVis();
}
function calculate() {//метод подсчета
    var qty = 0,
        amount = 0;
    for(var i = 0, n = table.tBodies[0].rows.length; i < n; i++){
        qty += parseFloat(table.tBodies[0].rows[i].cells[3].innerHTML);
        amount += parseFloat(table.tBodies[0].rows[i].cells[4].innerHTML);
       
    }
    table.tFoot.rows[0].cells[3].innerHTML = qty;
    table.tFoot.rows[0].cells[4].innerHTML = amount;
   
}
function deleteProduct(e) {//удаление продуктов
  table.deleteRow(e.parentNode.parentNode.rowIndex);
  calculate();
}
function removeSelected() {//удалить выделенные элементы
  var checks = table.tBodies[0].getElementsByTagName("input");
  var maincheck = table.tHead.getElementsByTagName("input");
  var i = 0;
  while(i < checks.length){
    if (checks[i].type == "checkbox" && checks[i].checked){
      deleteProduct(checks[i]);
    }
    else {
      i++;
    }
  }
  if(maincheck[0].checked){
    maincheck[0].checked = false;
  }
}
function ToggleCheck(e){//выделение 
  var checks = table.tBodies[0].getElementsByTagName("input");
  var i = 0;
  while(i < checks.length){
    if(checks[i].type == "checkbox"){
      checks[i].checked = e.checked;
    }
    i++;
  }
} 
function checkProd(qty){//проверка наличия товара если такой имеется суммируем количество без добавления
  for(var i=0;i<table.tBodies[0].rows.length;i++)
    if(table.tBodies[0].rows[i].cells[1].innerHTML==list.options[list.selectedIndex].text){
       var countProd = table.tBodies[0].rows[i].cells[3].innerHTML;
         countProd = eval(countProd+'+' +qty);
         table.tBodies[0].rows[i].cells[3].innerHTML = countProd;
         table.tBodies[0].rows[i].cells[4].innerHTML =table.tBodies[0].rows[i].cells[2].innerHTML*countProd;
         calculate();
         return true;
            }
        return false;
    }
function checkVis(){//проверка суммы если сумма больше 1000 переходим к методу present
  var pr = document.getElementById("result").innerHTML;
if (pr >= 1000) {
  $('#presen').css("display","inline");
}

}
function present() {//если сумма больше 1000 добавляем бонусный товар мороженное
  var but = document.getElementById("presen").disabled = true;//нажать можно только один раз
  var row = table.tBodies[0].insertRow(-1);
  row.insertCell(-1).innerHTML = '<input type="checkbox" name="toggle-group">';
  row.insertCell(-1).innerHTML = "Мороженное";
  row.insertCell(-1).innerHTML = "0";
  row.insertCell(-1).innerHTML = "1";
  row.insertCell(-1).innerHTML = "0";
  row.insertCell(-1).innerHTML = '<input type="button" onclick="deleteProduct(this);" value="Удалить">';
}