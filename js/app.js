// show the form on click to enter new tasks
let addTaskBtn=document.querySelector("#addBtn");
let taskForm= document.querySelector("#taskForm");
addTaskBtn.addEventListener('click',()=>{
    taskForm.classList.remove("d-none");
    addTaskBtn.classList.add("d-none");
});

//  get data from local storage if found and show it
let tasksList;
if(localStorage.getItem("tasks")){
    tasksList=JSON.parse(localStorage.getItem("tasks"));
    displayTask();
}else{
    tasksList=[];
}

// take the task from user
let taskIp=document.querySelector("#taskName");
let errPar=document.querySelector("#emptyErr");
taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    // is there a task value or not
    if(taskIp.value==''){
        errPar.classList.remove("d-none");
    }else{
        addTask(taskIp.value);
        errPar.classList.add("d-none");
        addTaskBtn.classList.remove("d-none");
        taskIp.value='';
        taskForm.classList.add("d-none");
    } 
});

// add task to local storage and tasks list then show it
function  addTask(taskVal){
    let task={
        title:taskVal,
        status:false
    }
    tasksList.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasksList));
    displayTask();
}

// display task cards
function displayTask(){
     let taskCard='';
     let statusClass;
     tasksList.forEach((ele,i) => {
         if(ele.status==false){
             statusClass='text-danger';
         }else{
            statusClass='text-success';
         }
         taskCard+=`
        <div class="task-card mb-3">
            <p > <i class=" ${statusClass} far fa-check-circle pr-2"></i>${ele.title}</p>
            <div class="control text-right">
                <button onclick="doneTask(${i});" class="btn btn-success ">Done</button>
                <button onclick="updateTask(${i});"  class="btn btn-warning ">Edit</button>
                <button onclick="deleteTask(${i});" class="btn btn-danger ">Remove</button>                      
           </div>
        </div>
        `;         
     });
     document.querySelector("#tasks").innerHTML=taskCard;
}

function doneTask(index){
    tasksList[index].status=true;
    localStorage.setItem("tasks",JSON.stringify(tasksList));
    displayTask();
}
function deleteTask(index){
    tasksList.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasksList));
    displayTask();
}
function updateTask(index){
    let updateBtn=document.querySelector("#updateBtn");
    let saveBtn=document.querySelector("#saveBtn");
    taskForm.classList.remove("d-none");
    addTaskBtn.classList.add("d-none");
    taskIp.value=tasksList[index].title;
    saveBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    if(taskIp.value==''){
        errPar.classList.remove("d-none");
    }else{
        updateBtn.addEventListener("click",()=>{
            let task={
                title:taskIp.value,
                status:false
            }
            tasksList[index]=task;
           localStorage.setItem("tasks",JSON.stringify(tasksList));
           displayTask();
            addTaskBtn.classList.remove("d-none");
           taskIp.value='';
           taskForm.classList.add("d-none");
           errPar.classList.add("d-none");
           saveBtn.classList.remove("d-none");
           updateBtn.classList.add("d-none");
        }) ;      
    }
    


    
}