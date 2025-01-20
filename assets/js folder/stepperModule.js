var stepperModule = (function ($) {
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
            errorMessage: (input) => `${input.attr("name")} is not valid `,
        },
    ]
    const stepData = {
        0: ["email", "password", "firstname", "lastname", "phone"],
        1: ["country", "city", "area", "pin"],
    }
    let currentPage = 1;
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
    const prevbtn = $(".prev");
    const nextbtn = $(".next");
    function init() {
        $('input').focus(inputfocus);
        $('input').blur(inputblur);
       
        $.each(data, function (key) {
            let option = $("<option></option");
            option.val(key);
            option.text(key);
            $("#country").append(option);

        })
        nextbtn.click(function () {
            if ($.fn.validatEachstep() == true) {
                stepperModule.currentPage += 1;
                $.fn.movePage();
            }
        })
        prevbtn.click(function () {
            stepperModule.currentPage -= 1;
            $.fn.movePage();
        })
        $(".number").hover(function(){
            $(".number").css("cursor", "pointer");
        })
        $(".page").click(function(){
            if ($.fn.validatEachstep() == true) {
            var val=$(this).text();
            stepperModule.currentPage=val;
            $.fn.movePage();
            }

        })

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
        
        $.fn.validatEachstep = (function () {
            var eachstep = true;
            $.each(stepData[currentPage - 1], function (key, value) {
                if ($.fn.validateField(validationDetails[value]) == false) {
                    eachstep = false;
                }
            })
            return eachstep;
        })
        $.fn.validateField = function (input) {
            var validfield = true;
            $.each(validationRules, function (key, value) {
                var attr = $(input).attr(value.attribute);
                if (typeof attr !== typeof undefined && attr !== false && !value.isValid(input)) {
                    allvalidate = false;
                    var tempval = "#" + input.attr('id') + "-error";
                    $(tempval).text(value.errorMessage(input));
                    validfield = false;
                    return false; //works like a break
                }
            })
            return validfield;
        }
       $("input, select").on('change', function(){
        if ($.fn.validateField($(this)) == true) {
            var tempval="#" + $(this).attr('id') + "-error";
            $(tempval).text("");
         }
       })
        $.fn.moveLastPage=function () {
            let formDataString = localStorage.getItem("formData");
            let formDetails = JSON.parse(formDataString);
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
        }
    
        $(".closeprofile").click(function () {
            $(".preview-modal").css("display", "none");
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
            }, 2000);
    
        }
    
    }
    function showNotification(msg) {
        $.fn.createtoastfunction(msg);
    }
    $.fn.movePage = function () {
        console.log(stepperModule.currentPage);
        prevbtn.removeAttr("disabled");
        nextbtn.removeAttr("disabled");
        if (stepperModule.currentPage === 1) {
            prevbtn.attr("disabled", "disabled");
        }
        if (stepperModule.currentPage === 3) {
            $.fn.moveLastPage();
            nextbtn.css("display","none");
            $("#submit").css("display","block");
        }
        else{
            $("#submit").css("display","none");
            nextbtn.css("display","block");
        }

        $(".active").removeClass("active");
        $(".number").eq(stepperModule.currentPage - 1).addClass("active");
        let stepNode = $(".steps");
        let width = ((stepperModule.currentPage - 1) * (750 * -1)) + "px";
        stepNode.css("margin-left", width);


    }
    function movepage() {
        $.fn.movePage();
    }
    

    var inputfocus= function() {
        $(this).css("backgroundColor", "grey");
    };
    var inputblur= function() {
        $(this).css("backgroundColor", "");
    };
    
    

    return {
        init: init,
        showNotification: showNotification,
        movepage:movepage,
        currentPage:currentPage,
    };

})(jQuery);