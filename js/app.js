
let addTaskBtn=document.querySelector("#addBtn");
let taskForm= document.querySelector("#taskForm");
let formBtn=document.querySelector("#formBtn");
let emptyErr=document.querySelector("#emptyErr");
let updateErr=document.getElementById("updateErr");
let tasksList;


//  get data from local storage if found and show it
if(localStorage.getItem("tasks")){
    tasksList=JSON.parse(localStorage.getItem("tasks"));
    displayTask();
}else{
    tasksList=[];
}

// show the form on click to enter new tasks
addTaskBtn.addEventListener('click',showForm);

// take the task from user
taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let taskIp=e.target.elements.taskName;
    let date=getDate();
    // save new task
    if(formBtn.innerHTML=='Save Task'){
        //  check input value
        if(checkInput(taskIp.value)){
            addTask(taskIp.value,date);
            displayTask();
            hideForm();
            taskIp.value='';
        }
        else{
            // show error for empty value
            emptyErr.classList.remove("d-none");
        }
    }
    // update an existing task
    else if(formBtn.innerHTML=='Update Task'){
        //  check input value
        if(checkInput(taskIp.value)){
            saveUpdate(taskIp.value,date);
            displayTask();
            hideForm();
            taskIp.value='';
        }
        else{
            // show error for empty value
            emptyErr.classList.remove("d-none");
        }
    }
    
});

// hide form after entering the task
function hideForm(){
    addTaskBtn.classList.remove("d-none");
    taskForm.classList.add("d-none");
    emptyErr.classList.add("d-none");
    updateErr.classList.add("d-none");
}

// show form  to enter the task
function showForm(){
    taskForm.classList.remove("d-none");
    addTaskBtn.classList.add("d-none");
    updateErr.classList.add("d-none");
}

// check if the input task is empty 
function checkInput(taskVal){
    let input=true;
    if(taskVal==''){
        input=false;
    }
    return input;
}
// add task to local storage and tasks list 
function  addTask(taskVal,date){
    let task={
        title:taskVal,
        status:false,
        date:date
    }
    tasksList.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasksList));  
}

// get date and time of entering task
function getDate(){
    let date= new Date();
    return date.toLocaleString();
}

// display task cards
function displayTask(){
     let taskCard='';
     let statusClass;
     tasksList.forEach((ele,index) => {
        //  changing color according to status of task
         if(ele.status==false){
             statusClass='text-danger';
         }else{
            statusClass='text-success';
         }

         taskCard+=`
        <div class="task-card mb-3">
            <p class="font-weight-bold"> <i class=" ${statusClass} far fa-check-circle pr-2 "></i>${ele.title}</p>
            <p class="text-primary">${ele.date}</p>
            <div class="control text-right">
                <button onclick="doneTask(${index});" class="btn btn-success ">Done</button>
                <button onclick="updateTask(${index});"  class="btn btn-warning ">Edit</button>
                <button onclick="deleteTask(${index});" class="btn btn-danger ">Remove</button>                      
           </div>
        </div>
        `;         
     });
     document.querySelector("#tasks").innerHTML=taskCard;
}

// mark the task as done by changing its ststus to true
function doneTask(index){
    tasksList[index].status=true;
    localStorage.setItem("tasks",JSON.stringify(tasksList));
    displayTask();
}

// delete the task from list 
function deleteTask(index){
    tasksList.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasksList));
    displayTask();
}

// prepare the form to edit the existing task
function updateTask(index){
    
    if(tasksList[index].status){
        updateErr.classList.remove("d-none");
    }else{
        updateErr.classList.add("d-none");
        showForm();
        let taskIp=document.getElementById("taskName");
        taskIp.value=tasksList[index].title;
        formBtn.innerHTML="Update Task";
        // save task index in local storage 
        localStorage.setItem("index",index);
    }
}

// save task updates 
function saveUpdate(taskVal,date){
    let task={
        title:taskVal,
        status:false,
        date:date
    } 
    let index=localStorage.getItem("index");
    tasksList[index]=task;
    localStorage.setItem("tasks",JSON.stringify(tasksList));   
    formBtn.innerHTML="Save Task";           
}