(document).ready(function () {
    
    $("#myForm").on("submit", function (e) {
        e.preventDefault();
        var formData = {
            email: $("#email").val(),
            password: $("#password").val(),
            country: $("#country").val(),
            city: $("#city").val(),
            area: $("#area").val(),
            pin: $("#pin").val(),
            university: $("#university").val(),
            qualification: $("#qualification").val(),
            grade: $("#grade").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            phone: $("#phone").val(),
            date: $("#date").val(),
        }

        if ($('#yes').is(':checked')) {
            formData.relocation = "yes";
        }
        else if ($('#no').is(':checked')) {
            formData.relocation = "no";
        }
        else {
            formData.relocation = "";
        }
        console.log(formData);

        var validation = {
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\d{10}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            firstname: /^.+$/,
            lastname: /^.+$/,
            country: /^.+$/,
            city: /^.+$/,
            area: /^.+$/,
            university: /^.+$/,
            qualification: /^.+$/,
            grade: /^.+$/,
            pin: /^\d+$/,
            relocation: /^.+$/,
            date: /^.+$/,


        }
        $.fn.validatefunction = function (key, value) {
            if (value && validation[key].test(value)) return true;
            else return false;

        }
        $.each(formData, function (key, value) {
            var isValid = $.fn.validatefunction(key, value);
            if (isValid == false) {
                var keystr = String(key) + "-error";
                if (key == "email") {
                    $("#" + keystr).text("Input is invalid");
                }
                else
                    if (key == "password") {
                        $("#" + keystr).text("Password should contain atleast one digit, one uppercase, one lowercase.");
                    }
                    else
                    if (key == "phone") {
                        $("#" + keystr).text("Phone should consists of 10 digits");
                        }
                    else
                    if(key == "pin") {
                        $("#" + keystr).text("Pin should not be null and should contain only numbers");
                        }
                    else{
                        $("#" + keystr).text("Input is Missing");
                        }


            }
            else {
                console.log("it is valid");
            }
        })

    });


    $("input").focus(function () {
        $(this).css("backgroundColor", "grey");
    });
    $("input").blur(function () {
        $(this).css("backgroundColor", "");
    });

    $("#email").blur(function () {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.value)) {
            $(this).css("borderColor", "red");
            $("#email-error").text("Please Enter a Valid Email Address");
        }
        else{
            $(this).css("borderColor", "green");
            $("#email-error").text("");
        }
    })

    $("#phone").blur(function () {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(this.value)) {
            $(this).css("borderColor", "red");
            $("#phone-error").text("Phone Number should be of exactly 10 Digits");
        }
        else{
            $(this).css("borderColor", "green");
            $("#phone-error").text("");
        }
    })

//password validation
var myInput = $("#password").val();


$("#password").focus(function(){
    $("#message").css("display", "block");
})
$("#password").blur(function(){
    $("#message").css("display", "none");
})

$("#password").keyup(function(){
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.match(lowerCaseLetters)) {
        $("#letter").removeClass("invalid");
        $("#letter").addClass("valid");
    } else {
        $("#letter").removeClass("valid");
        $("#letter").addClass("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.match(upperCaseLetters)) {
        $("#capital").removeClass("invalid");
        $("#capital").addClass("valid");
    } else {
        $("#capital").removeClass("valid");
        $("#capital").addClass("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.match(numbers)) {
        $("#number").removeClass("invalid");
        $("#number").addClass("valid");
    } else {
        $("#number").removeClass("valid");
        $("#number").addClass("invalid");
    }

    // Validate length
    if (myInput.length >= 8) {
        $("#length").removeClass("invalid");
        $("#length").addClass("valid");
    } else {
        $("#length").removeClass("valid");
        $("#length").addClass("invalid");
    }

})



});
