let rowCount=1;
//Check button value
function checkValue(no) {
	let val = $("#btn").val();
	if(val=="Add"){
		addRow();
	}
	else{
		updateRow(no);
	}
}

// check empty input
function checkEmptyInput()
{
	let isEmpty = false;
	const firstName = $("#fname").val();
	const lastName = $("#lname").val();
	const backgroundColor = $("#hexcolor").val();
	const txtSize = $("#txtsize").val();

	const hexpattern = new RegExp(/^#[0-9A-F]{6}$/i);
	if(!firstName || !lastName || !backgroundColor || !txtSize){
	  alert("Enter all details");
	  isEmpty = true;
	}else if(!hexpattern.test(backgroundColor)){
	  alert("Wronge Correct code");
	  isEmpty = true;
	}
	return isEmpty;
}

//Add Row
function addRow()
{		
	if(!checkEmptyInput()){

		const firstName = $("#fname").val();
		const lastName = $("#lname").val();
		const backgroundColor = $("#hexcolor").val();
		const txtSize = $("#txtsize").val();

		let rows = $("<tr rowNumber='"+rowCount+"''><td><input type='checkbox' name='chkbox' id='chkbox'></td><td><input type='text' id='firstName"+rowCount+"' value='"+firstName+"' style='background-color:"+backgroundColor+";font-size:"+txtSize+"' disabled></td><td><input type='text' id='lastName"+rowCount+"' value='"+lastName+"' style='background-color:"+backgroundColor+";font-size:"+txtSize+"' disabled></td><td><input type='button' id='editRow"+rowCount+"' onclick='edit_row("+rowCount+")' value='Edit' style='background-color:green;'></td><td><input type='button' id='deleteRow"+rowCount+"' onclick='delete_row("+rowCount+")' value='Delete' style='background-color:red;'></td></tr>");
		rows.hide();
		$('tr:last-child').after(rows);
		rows.fadeIn("slow");
		rowCount++;
		$("#fname").val("");
		$("#lname").val("");
		$("#hexcolor").val("");
		$("#txtsize").val("");
		$("#defaultRow").css("visibility","visible");
		$("#check_all").prop("checked", false);
	}
}
  
//Select all rows
function selectallRows(check) {
	let count=0;

	$('input[id=chkbox]:checkbox').each(function(){ 
	  if($('input[id=check_all]:checkbox:checked').length == 0){ 
	    $(this).prop("checked", false); 
	  } else {
	    $(this).prop("checked", true); 
	    count++;
	  } 
	});
	alert(count);
	$("#selectedRows").text(count);
}

  

//delete multiple rows
function deleteMultipleRow() {

  let table = document.getElementById("data_table");
  let rowCount = table.rows.length;

  for(let i=0; i<rowCount; i++) {
    let row = table.rows[i];
    let chkbox = row.cells[0].childNodes[0];
    if(null != chkbox && true == chkbox.checked) {
      table.deleteRow(i);
      rowCount--;
      i--;
    }
  }
}

$('body').on('click',"#deleteRow"+rowCount,function() {
let rows = $(this).parents('tr').fadeOut("slow", function() {
         $(this).remove();
         --rowCount;
      });
});
	
// display selected row data into input text
let number;
function edit_row(no)
{
	let fnameval = $(`#firstName${no}`).val();
	let lnameval = $(`#lastName${no}`).val();
	$("#fname").val(fnameval);
	$("#lname").val(lnameval);
	$("#btn").val("Update");
	number=no;              
}

//Update row
function updateRow(number)
{
if(!checkEmptyInput()){
	      document.getElementById("fname_val"+number+"").value = document.getElementById("fname").value;
 	  document.getElementById("lname_val"+number+"").value = document.getElementById("lname").value;
 	  document.getElementById("fname").value="";
 	  document.getElementById("lname").value="";
    document.getElementById("btn").value = "Add";
	}
}