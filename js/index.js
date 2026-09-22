let form=document.querySelector("form"),
inputs=document.querySelectorAll('#Register input'),
students=[],
regexInputs={
    firstName:/^[A-Za-z]+$/,
    lastName:/^[A-Za-z]+$/,
    email:/^[A-Za-z][A-Za-z0-9\.]+@(gmail|yahoo)\.(com|org)$/,
    age:/^[0-9]{2}$/,
    phone:/^(02)?01(1|2|0|5)[0-9]{8}$/
},
id=0,
table=document.querySelector('table tbody'),
reloadIcon=document.querySelector("#Register .body form>i"),
searchInput=document.querySelector("#SearchInput");
if(localStorage.getItem('students') == null){
    updateLocalStorage()
}else {
    students=JSON.parse(localStorage.getItem('students'));
    id=students[students.length -1]?.id ?? 0;
    showStudents(students)   
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    let formType=form.getAttribute("data-type");
    if (formType =="add"){
        addStudent()
    }else if(formType == "edit" ){
        editStudent()
    }
})

searchInput.addEventListener("keyup",function(){
    search(this.value)
})