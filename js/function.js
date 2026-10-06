function getStudent(id) {
    let student = {
        id: id
    }
    inputs.forEach(function (input) {
        let key = input.name,
            value = input.value;
        student[key] = value
        input.dataset.valid='false'
    })
    return student
}

function addStudent() {
    let emptyInput = document.querySelector('input[data-valid="false"]'),
        focusInput = document.querySelector("input:focus");
    focusInput?.blur();
    let invalidInput = document.querySelector('input.is-invalid');
    if (invalidInput !== null || emptyInput !== null) {
        return
    }
    let student = getStudent(++id);
    students.push(student)
    updateLocalStorage()
    showStudent(student)
    isNoData(student)
    clearForm();    
}

function showStudent(student) {

    table.innerHTML += ` 
       <tr data-id=${student.id}>
            <th>${student.id}</th>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
            <div class="button">
                <button class="btn btn-info text-light me-lg-3 me-md-1 edit" onclick="insertEditInToForm(${student.id})">Edit</button>
                <button class="btn btn-danger delete" onclick='deleteStudent(${student.id},this)'>Delete</button>
            </div>
            </td>
        </tr> 
    `;

}

function checkInput(input) {

    let inputName = input.name,
        inputValue = input.value,
        empty = inputValue === '',
        alert = document.querySelector(`p.alert[data-error-name="${inputName}"]`),
        isInvalid = !regexInputs[inputName].test(inputValue),
        errorMass = '';

    if (empty) {
        errorMass = 'This field is required'
    } else if (isInvalid) {
        errorMass = 'Invalid Field'
    }
    if (empty || isInvalid) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        alert.classList.remove("d-none");
        alert.textContent = errorMass;
        input.dataset.valid = false;
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        alert.classList.add("d-none");
        input.dataset.valid = true;

    }

}

function updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students))
}

function showStudents(data) {
    table.innerHTML=`
        <tr class="table-warning text-center">
            <td colspan="7" id="Alert"></td>
        </tr>
    `;
    data.forEach(function (student) {
        showStudent(student)
    })
    isNoData(data)
}

function findStudentIndex(id) {
    return students.findIndex(function (student) {
     return   student.id == id
        
    })
}

function deleteStudent(id, that) {
    if (!confirm("are you sure?")) {
        return
    }
    let studentIndex = findStudentIndex(id)
    students.splice(studentIndex, 1)
    trEle = that.closest("tr");
    trEle.remove();
    updateLocalStorage();
    isNoData(students)

}

function isNoData(data) {
    let emptyTableAlert = document.querySelector("#Alert");
    if (data.length == 0) {
        emptyTableAlert.classList.remove("d-none");
        emptyTableAlert.textContent = "There are no data"
    } else {
        emptyTableAlert.classList.add("d-none");
    }
}

function clearForm() {
    form.reset();
    inputs.forEach(function (input) {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
        document.querySelector(`p.alert[data-error-name='${input.name}']`).classList.add('d-none')
    })
}

function editFormBtn(type){
    let formBtn = form.querySelector("button"),
    tableBtn = document.querySelectorAll("table button");

    if(type == "edit"){
        formBtn.textContent = "Edit";
        formBtn.classList.add("btn-info");
        formBtn.classList.add("text-light");
        formBtn.classList.remove("btn-success");
        tableBtn.forEach(function (btn) {
            btn.classList.add("disabled")
        })
        reloadIcon.classList.remove("d-none");
    }else if(type == "add"){
        formBtn.textContent = "Add";
        formBtn.classList.remove("btn-info");
        formBtn.classList.remove("text-light");
        formBtn.classList.add("btn-success");
        tableBtn.forEach(function (btn) {
            btn.classList.remove("disabled")
        })
        reloadIcon.classList.add("d-none")
    } 
}


function insertEditInToForm(id) {
    clearForm()
    let student = students.find(function (student) {
        return student.id == id
    })
    inputs.forEach(function (input) {
        input.value = student[input.name];
    })
    
    form.setAttribute("data-type","edit")
    form.setAttribute("data-id", id)
    editFormBtn("edit")
    reloadIcon.addEventListener('click',function(){
        clearForm();
        editFormBtn("add");
    })
}

function editStudent() {
    
    let studentId = form.getAttribute("data-id"),
        student = getStudent(studentId),
        studentIndex = findStudentIndex(studentId),
        trEle=table.querySelector(`tr[data-id='${student.id}']`);
    trEle.innerHTML=`
    <th>${student.id}</th>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.phone}</td>
    <td>
    <div class="button">
    <button class="btn btn-info text-light me-lg-3 me-md-1 edit" onclick="insertEditInToForm(${student.id})">Edit</button>
    <button class="btn btn-danger delete" onclick='deleteStudent(${student.id},this)'>Delete</button>
    </div>
    </td>
    `;
    console.log(studentIndex,studentId)
    students[studentIndex] = student;    
    updateLocalStorage();
    clearForm()
    editFormBtn("add")
}

function search(searchValue){
    let filterStudents= students.filter(function(student){
        return student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.phone.toLowerCase().includes(searchValue.toLowerCase()); 
    });
    showStudents(filterStudents)
}