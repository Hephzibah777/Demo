var formModule = (function ($) {
    let i = 0;
    function init(){
        $("#myForm").on("submit", function (e) {
            e.preventDefault();
            if (tableModule.editrow != null) {
                let temp = tableModule.editrow.id;
                $(`#myTable tbody tr:eq(${temp}) td:eq(0)`).text($("#email").val());
                $(`#myTable tbody tr:eq(${temp}) td:eq(1)`).text($("#phone").val());
                $(`#myTable tbody tr:eq(${temp}) td:eq(2)`).text($("#firstname").val());
                $(`#myTable tbody tr:eq(${temp}) td:eq(3)`).text($("#lastname").val());
                stepperModule.showNotification('<i class="fa-solid fa-check"></i> Updated Successfully');
                $("#myForm")[0].reset();
                editrow = null;
            }
            else {
                let formData = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                    country: $("#country").val(),
                    city: $("#city").val(),
                    area: $("#area").val(),
                    pin: $("#pin").val(),
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    phone: $("#phone").val(),
                }
                formData.id = i;
                i = i + 1;
                if ($('#yes').is(':checked')) {
                    formData.relocation = "yes";
                }
                else if ($('#no').is(':checked')) {
                    formData.relocation = "no";
                }
                else {
                    formData.relocation = "";
                }
                formDetails = formData;
                localStorage.setItem("formData", JSON.stringify(formData));
                tableModule.addRow(formData);
                stepperModule.showNotification('<i class="fa-solid fa-check"></i> Submitted Successfully');
            }
            $("#myForm")[0].reset();
    
        });
    }
   

    return {
       init:init,
    };

})(jQuery);

