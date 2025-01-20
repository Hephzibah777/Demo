var tableModule = (function ($) {
    let editrow=null;
    function init(){
        
        $.fn.handleEdit = function (formData) {
            $.each(formData, function (key, value) {
                let temp = "#" + key;
                $(temp).val(formData[key]);
                if (formData.relocation == "yes") {
                    $("#yes").prop("checked", true);
                }
                else if (formData.relocation == "no") {
                    $("#no").prop("checked", true);
                }
    
            })
            $("#password").attr("disabled", "disabled");
            $("#buttondetail").text("Update");
            tableModule.editrow = formData;
            stepperModule.currentPage=1;
            stepperModule.movepage();
           
        }
        $.fn.handleDelete = function (formData) {
            $("#modal").css("display", "block");
            $("#closedel").click(function () {
                $("#modal").css("display", "none");
            })
            $("#nooption").click(function () {
                $("#modal").css("display", "none");
            })
            $("#yesoption").click(function () {
                $(`#myTable tbody tr:eq(${formData.id})`).remove();
                $("#modal").css("display", "none");
                stepperModule.showNotification('<i class="fa-solid fa-check"></i> Deleted Successfully');
            })
           
        }
    
    }
    function addRow() {
        let formDataString = localStorage.getItem("formData");
        let formData = JSON.parse(formDataString);
        const tablebody = $("#myTable tbody");
        const newRow = $("<tr></tr>");

        const emailCell = $("<td></td>");
        const phoneCell = $("<td></td>");
        const firstnameCell = $("<td></td>");
        const lastnameCell = $("<td></td>");

        emailCell.text(formData.email);
        phoneCell.text(formData.phone);
        firstnameCell.text(formData.firstname);
        lastnameCell.text(formData.lastname);

        newRow.append(emailCell);
        newRow.append(phoneCell);
        newRow.append(firstnameCell);
        newRow.append(lastnameCell);

        //create edit button for each newly added row
        const editbutton = $("<button></button>");
        editbutton.text("Edit");
        editbutton.addClass("button-edit");
        editbutton.click(function () {
            $.fn.handleEdit(formData);
        })

        const deletebutton = $("<button></button>");
        deletebutton.text("Delete");
        deletebutton.addClass("button-delete");
        deletebutton.click(function () {
            $.fn.handleDelete(formData);
        })

        const commonbutton = $("<td></td>");
        commonbutton.addClass("buttons");
        commonbutton.append(editbutton, deletebutton);

        newRow.append(commonbutton);
        tablebody.append(newRow);

        $("#myForm")[0].reset();
    }

    
    return {
        init:init,
        editrow:editrow,
        addRow:addRow,
    }


})(jQuery);

