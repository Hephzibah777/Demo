(function ($) {
    $(document).ready(function () {
        let i = 0;
        let editrow = null;
        let formDetails = null;
        $("#myForm").on("submit", function (e) {
            e.preventDefault();
            if (editrow != null) {
                let temp = $("#myTable tbody");
                console.log(temp);
                //    $(`#myTable tbody tr:nth-child(${editrow.id}) tr:nth-child(0)`).val(editrow.email);
                //    $(`#myTable tbody tr:nth-child(${editrow.id}) tr:nth-child(1)`).val(editrow.phone);
                //    $(`#myTable tbody tr:nth-child(${editrow.id}) tr:nth-child(2)`).val(editrow.firstname);
                //    $(`#myTable tbody tr:nth-child(${editrow.id}) tr:nth-child(3)`).val(editrow.lastname);
                $("#buttondetail").text("Submit Application");
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
                formDetails=formData;



                // var validation = {
                //     email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                //     phone: /^\d{10}$/,
                //     password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                //     firstname: /^.+$/,
                //     lastname: /^.+$/,
                //     country: /^.+$/,
                //     city: /^.+$/,
                //     area: /^.+$/,
                //     pin: /^\d+$/,
                //     relocation: /^.+$/,


                // }


                // $.fn.validatefunction = function (key, value) {
                //     if (value && validation[key].test(value)) return true;
                //     else return false;

                // }

                // var isValidfields = true;
                // $.each(formData, function (key, value) {
                //     var isValid = $.fn.validatefunction(key, value);
                //     if (isValid == false && key != "id") {
                //         isValidfields = false;
                //         console.log(`${key}` + isValidfields);
                //         var keystr = String(key) + "-error";
                //         console.log(`${key}`);
                //         if (key === "email") {
                //             $("#" + keystr).text("Input is invalid");
                //         }
                //         else
                //             if (key == "password") {
                //                 $("#" + keystr).text("Password should contain atleast one digit, one uppercase, one lowercase.");
                //             }
                //             else
                //                 if (key == "phone") {
                //                     $("#" + keystr).text("Phone should consists of 10 digits");
                //                 }
                //                 else {
                //                     $("#" + keystr).text("Input is Missing");
                //                 }
                //     }
                // })

                // if (isValidfields == true) {
                //     $.fn.createtoastfunction("Submitted Successfully");
                //     $.fn.addrows(formData);

                // }
                // else {
                //     $.fn.createtoastfunction("Invalid Credentials");
                // }
                
               
                
               
                // $.each(FormDetails, function (key, value) {
                //     $.fn.validateField(value);
                // })
                // if (allvalidate == true) {
                //     $.fn.createtoastfunction("Submitted Successfully");
                //     $.fn.addrows(formData);
                // }


                $.fn.addrows(formData);
                $.fn.createtoastfunction('<i class="fa-solid fa-check"></i> Submitted Successfully');
                $("#myForm")[0].reset();
            }
        });
         
        let validationDetails = {
            email: $("#email"),
            password: $("#password"),
            country: $("#country"),
            city: $("#city"),
            area: $("#area"),
            pin: $("#pin"),
            firstname: $("#firstname"),
            lastname: $("#lastname"),
            phone: $("#phone"),
        }
        let allvalidate = true;
        
        let validationRules = [
            {
                attribute: "req",
                isValid: input => input.val() !== "",
                errorMessage: (input) => {
                    return `${input.attr("name")} is required`;
                },
            },
            {
                attribute: "minLength",
                isValid: input => input.val().length >= input.attr("minLength"),
                errorMessage: (input) => `${input.attr("name")} should atleast be of length ${input.attr("minLength")}`,
            },
            {
                attribute: "maxLength",
                isValid: input => input.val().length <= input.attr("maxLength"),
                errorMessage: (input) => `${input.attr("name")} is more than ${input.attr("maxLength")}`,
            },
            {
                attribute: "pattern",
                isValid: input => {
                    const pattern = new RegExp(input.attr("pattern"));
                    return pattern.test(input.val());
                },
                errorMessage: (input) => `Not a valid ${input.attr("name")}`,
            },
        ]
        $.fn.validateField = function (input) {
            var validfield=true;
            $.each(validationRules, function (key,value) {
                var attr=$(input).attr(value.attribute);
                if (typeof attr !== typeof undefined && attr !== false && !value.isValid(input)) {
                    allvalidate = false;
                    var tempval = "#" + input.attr('id') + "-error";
                    $(tempval).text(value.errorMessage(input));
                    validfield=false;
                }
            })
            return validfield;
        }
       

        $("input").focus(function () {
            $(this).css("backgroundColor", "grey");
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
            else {
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
            else {
                $(this).css("borderColor", "green");
                $("#phone-error").text("");
            }
        })

        //password validation
        $("#password").focus(function () {
            $("#message").css("display", "block");
        })


        $("#password").blur(function () {
            $("#message").css("display", "none");
        })

        $("#password").keyup(function () {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if ($("#password").val().match(lowerCaseLetters)) {
                $("#letter").removeClass("invalid");
                $("#letter").addClass("valid");
            } else {
                $("#letter").removeClass("valid");
                $("#letter").addClass("invalid");
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if ($("#password").val().match(upperCaseLetters)) {
                $("#capital").removeClass("invalid");
                $("#capital").addClass("valid");
            } else {
                $("#capital").removeClass("valid");
                $("#capital").addClass("invalid");
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if ($("#password").val().match(numbers)) {
                $("#number").removeClass("invalid");
                $("#number").addClass("valid");
            } else {
                $("#number").removeClass("valid");
                $("#number").addClass("invalid");
            }

            // Validate length
            if ($("#password").val().length >= 8) {
                $("#length").removeClass("invalid");
                $("#length").addClass("valid");
            } else {
                $("#length").removeClass("valid");
                $("#length").addClass("invalid");
            }

        })

        const data = {
            "USA": {
                "New York": ["Manhattan", "Brooklyn", "Queens"],
                "California": ["Los Angeles", "San Francisco", "San Diego"]
            },
            "India": {
                "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
                "Delhi": ["South Delhi", "North Delhi", "West Delhi"]
            }
        };


        $.each(data, function (key) {
            let option = $("<option></option");
            option.val(key);
            option.text(key);
            $("#country").append(option);

        })

        $("#country").change(function () {
            const countryselected = $("#country").val();
            if (countryselected) {
                $.each(data[countryselected], function (key) {
                    let option = $("<option></option");
                    option.val(key);
                    option.text(key);
                    $("#city").append(option);
                })
            }
        })
        $("#city").change(function () {
            const countryselected = $("#country").val();
            const cityselected = $("#city").val();
            if (countryselected && cityselected) {
                $.each(data[countryselected][cityselected], function (key, value) {
                    let option = $("<option></option");
                    option.val(value);
                    option.text(value);
                    $("#area").append(option);
                })
            }
        })


        $.fn.createtoastfunction = function (msg) {
            let toast = $("<div></div>");
            let toastBox = $("#toastBox");
            toastBox.addClass("toast");
            toast.html(msg);
            toastBox.append(toast);

            if (msg.includes('Invalid')) {
                toastBox.addClass("invalid");
            }

            setTimeout(() => {
                toastBox.remove();
            }, 6000);

        }

        $.fn.addrows = function (formData) {
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
            $("#buttondetail").text("Update");
            editrow = formData;
        }
        $.fn.handleDelete = function (formData) {

        }

        let currentPage = 1;
        const prevbtn = $(".prev");
        const nextbtn = $(".next");
        $.fn.movePage = function () {
            prevbtn.removeAttr("disabled");
            nextbtn.removeAttr("disabled");
            if (currentPage === 1) {
                prevbtn.attr("disabled", "disabled");
            } else if (currentPage === 3) {
                nextbtn.attr("disabled", "disabled");
            }

            $(".active").removeClass("active");
            $(".number").eq(currentPage - 1).addClass("active");
            let stepNode = $(".steps");
            let width = ((currentPage - 1) * (750 * -1)) + "px";
            stepNode.css("margin-left", width);


        }
        prevbtn.click(function () {
            currentPage -= 1;
            $.fn.movePage();
        })
        nextbtn.click(function () {
            console.log($.fn.validatEachstep());
            if($.fn.validatEachstep()==true){
            currentPage += 1;
            $.fn.movePage();
            }
        })
        
        const stepData = {
            0:["email", "password","firstname", "lastname", "phone"],
            1:["country", "city", "area", "pin"],
        }
        $.fn.validatEachstep=(function(){
            var eachstep=true;
            $.each(stepData[currentPage-1], function(key, value){
                if($.fn.validateField(validationDetails[value])==false){
                    eachstep=false;
                }
            })
            return eachstep;    
        })



        $("#preview").click(function () {
            const preview = $(".preview-modal");
            preview.css("display", "block");
            $.each(formDetails, function (key, value) {
                var temp = "#" + key + "-value";
                if (temp == "#firstname-value") {
                    var valuesec = formDetails.firstname + " " + formDetails.lastname;
                    $(temp).text(valuesec);
                }
                else if (temp == "#relocation-value" && value == "yes") {
                    $(temp).text("Ready to Relocate");
                }
                else if (temp == "#relocation-value" && value == "no") {
                    $(temp).text("Not Ready to Relocate");
                }
                else {
                    $(temp).text(value);
                }

            })
        })

        $(".closeprofile").click(function () {
            $(".preview-modal").css("display", "none");
        })
    });

})(jQuery);

