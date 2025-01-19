let editrow = null;
let jsondata = null;
let i = 0;



// the below function works only when the validation is successfull, it adds the entries of the form in the table
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("hello");
    //check whether the form is valid or not
    if (checkforvalidation(event) == true) {
        if (editrow != null) {
            let tabledata = document.getElementById("myTable");
            var tbody = tabledata.tBodies[0];
            var row = tbody.rows[editrow.id];
            row.cells[0].innerHTML = document.getElementById("email").value;
            row.cells[1].innerHTML = document.getElementById("phone").value;
            row.cells[2].innerHTML = document.getElementById("firstname").value;
            row.cells[3].innerHTML = document.getElementById("lastname").value;
            showToast('<i class="fa-solid fa-square-check"></i> Updated Successfully');

            document.getElementById("buttondetail").textContent = "Submit Application";
            editrow = null;
        }
        else {
            let form = document.getElementById("myForm");
            let yes = document.getElementById("yes");
            let no = document.getElementById("no");
            let formData = {};
            for (let i = 0; i < form.elements.length; i++) {
                let element = form.elements[i];
                if (element.type != "submit" && element.type != "checkbox") {
                    formData[element.name] = element.value;
                }
                if (yes.checked) {
                    formData[yes.name] = yes.value;
                }
                if (no.checked) {
                    formData[no.name] = no.value;
                }

            }
            formData.id = i;
            i = i + 1;
            const tablebody = document.querySelector("#myTable tbody");
            const newRow = document.createElement("tr");
            const emailCell = document.createElement("td");
            emailCell.textContent = formData.email;

            const phoneCell = document.createElement("td");
            phoneCell.textContent = formData.phone;

            const firstnameCell = document.createElement("td");
            firstnameCell.textContent = formData.firstname;

            const lastnameCell = document.createElement("td");
            lastnameCell.textContent = formData.lastname;

            newRow.appendChild(emailCell);
            newRow.appendChild(phoneCell);
            newRow.appendChild(firstnameCell);
            newRow.appendChild(lastnameCell);


            //create edit button for each newly added row
            const editbutton = document.createElement("button");
            editbutton.textContent = "Edit";
            editbutton.classList.add("button-edit");
            editbutton.addEventListener("click", function () {
                handleEdit(formData);
            });

            //create delete button for each newly added row
            const deletebutton = document.createElement("button");
            deletebutton.textContent = "Delete";
            deletebutton.classList.add("button-delete");
            deletebutton.addEventListener("click", function () {
                handleDelete(formData);
            });

            const commonbutton = document.createElement("td");
            commonbutton.classList.add("buttons");
            commonbutton.append(editbutton, deletebutton);

            newRow.appendChild(commonbutton);
            tablebody.append(newRow);

            document.getElementById("myForm").reset();
            showToast('<i class="fa-solid fa-square-check"></i> Submitted Successfully');
        }
    }

});

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

//handle edit button action
function handleEdit(row) {
    console.log(row);
    document.getElementById("email").value = row.email;
    document.getElementById("country").value = row.country;
    document.getElementById("city").value = row.city;
    document.getElementById("area").value = row.area;
    document.getElementById("firstname").value = row.firstname;
    document.getElementById("lastname").value = row.lastname;
    document.getElementById("pin").value = row.pin;
    document.getElementById("phone").value = row.phone;
    document.getElementById("university").value = row.university;
    document.getElementById("qualification").value = row.qualification;
    document.getElementById("grade").value = row.grade;
    document.getElementById("date").value = row.date;
    if ("yes" in row) {
        document.getElementById("yes").checked = true;
    }
    if ("no" in row) {
        document.getElementById("no").checked = true;
    }

    document.getElementById("buttondetail").textContent = "Update";
    editrow = row;

}

//handle delete button action
function handleDelete(row) {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    var yes = document.getElementById("yesoption");
    var no = document.getElementById("nooption");
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    no.onclick = function () {
        modal.style.display = "none";
    }
    yes.onclick = function () {

        let tabledata = document.getElementById("myTable");
        var tbody = tabledata.tBodies[0];
        var deleterowid = row.id;

        tbody.deleteRow(deleterowid);
        showToast('<i class="fa-solid fa-trash"></i> Deleted Successfully');
        modal.style.display = "none";

    }



}

// Populate country dropdown on page load
window.onload = function () {
    const countrySelect = document.getElementById('country');
    for (let country in data) {
        let option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
};

// Populate cities based on selected country
function populateCities() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const areaSelect = document.getElementById('area');
    const selectedCountry = countrySelect.value;

    // Clear existing options
    citySelect.innerHTML = '<option value="">Select City</option>';
    areaSelect.innerHTML = '<option value="">Select Area</option>';

    if (selectedCountry) {
        const cities = Object.keys(data[selectedCountry]);
        cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Populate areas based on selected city
function populateAreas() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const areaSelect = document.getElementById('area');
    const selectedCountry = countrySelect.value;
    const selectedCity = citySelect.value;

    // Clear existing options
    areaSelect.innerHTML = '<option value="">Select Area</option>';

    if (selectedCountry && selectedCity) {
        const areas = data[selectedCountry][selectedCity];
        areas.forEach(area => {
            let option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }
}


function highlightField(field) {
    field.style.backgroundColor = "grey";
}
function nohighlightField(field) {
    field.style.backgroundColor = "";
}

//validate email while the user is typing
function validateEmail(field) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(field.value)) {
        field.style.borderColor = "red";
        document.getElementById("email-error").textContent = "Please enter a valid email address";
    }
    else {
        field.style.borderColor = "green";
        document.getElementById("email-error").textContent = "";
    }
    field.style.backgroundColor = "";
}


//Empty fields validation manually
const form = document.getElementById("myForm");

function checkforvalidation(e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var area = document.getElementById("area").value;
    var pin = document.getElementById("pin").value;
    var university = document.getElementById("university").value;
    var qualification = document.getElementById("qualification").value;
    var grade = document.getElementById("grade").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var yes = document.getElementById("yes").value;
    var no = document.getElementById("no").value;


    let isValid = true;
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("country-error").textContent = "";
    document.getElementById("city-error").textContent = "";
    document.getElementById("area-error").textContent = "";
    document.getElementById("pin-error").textContent = "";
    document.getElementById("university-error").textContent = "";
    document.getElementById("qualification-error").textContent = "";
    document.getElementById("grade-error").textContent = "";
    document.getElementById("firstname-error").textContent = "";
    document.getElementById("lastname-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("radio-error").textContent = "";
    document.getElementById("date-error").textContent = "";


    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
    if (email == "") {
        document.getElementById("email-error").textContent = "Invalid email address.";
        isValid = false;
    }


    if (password == "") {
        document.getElementById("password-error").textContent = "Password field is missing";
        isValid = false;
    }


    const countryRegex = /^[a-zA-Z]{1,10}$/;
    if (country == "") {
        document.getElementById("country-error").textContent = "Country field is missing";
        isValid = false;
    }
    if (city == "") {
        document.getElementById("city-error").textContent = "City field is missing ";
        isValid = false;
    }
    if (area == "") {
        document.getElementById("area-error").textContent = "Area field is missing";
        isValid = false;
    }
    const pinRegex = /^\d$/;
    if (pin == "") {
        document.getElementById("pin-error").textContent = "Pin must  contain only numbers";
        isValid = false;
    }
    if (university == "") {
        document.getElementById("university-error").textContent = "University is not selected";
        isValid = false;
    }
    if (qualification == "") {
        document.getElementById("qualification-error").textContent = "Qualification is not selected";
        isValid = false;
    }
    if (grade == "") {
        document.getElementById("grade-error").textContent = "Grade is not selected";
        isValid = false;
    }
    if (firstname == "") {
        document.getElementById("firstname-error").textContent = "First Name field is missing";
        isValid = false;
    }
    if (lastname == "") {
        document.getElementById("lastname-error").textContent = "Last Name field is missing";
        isValid = false;
    }
    const phoneRegex = /^[7-9][0-9]{9}$/;
    if (phone == "") {
        document.getElementById("phone-error").textContent =
            "Phone number is missing";
        isValid = false;
    }
    if (yes == "" && no == "") {
        document.getElementById("radio-error").textContent = "Relocation is not selected";
        isValid = false;
    }
    if (date == "") {
        document.getElementById("date-error").textContent = "Date is not selected";
        isValid = false;
    }


    if (isValid == true) {

        return true;
    }
    else {
        showToast('<i class="fa-solid fa-circle-exclamation"></i> Invalid Input');
    }

}
function showToast(msg) {
    let toastBox = document.getElementById("toastBox");
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if (msg.includes('Invalid')) {
        toast.classList.add('invalid');
    }

    setTimeout(() => {
        toast.remove();
    }, 6000);

}
// password toggle visibility
function myFunction() {
    var temp = document.getElementById("passwordcheck");
    var myInput = document.getElementById("password");
    if (myInput.type === "password") {
        myInput.type = "text";
    }
    else {
        myInput = "password";
    }


}
//password validation
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var message = document.getElementById("message");

myInput.onfocus = function () {
    message.style.display = "block";
}
myInput.onblur = function () {
    message.style.display = "none";
}
// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

}