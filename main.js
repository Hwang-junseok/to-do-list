//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할 일이 추가된다.
//delete버튼을 누르면 할 일이 삭제된다
//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난걸로 간주라고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.querySelector(".task-input");
let addButton = document.querySelector(".add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tab-underline");
let input = document.getElementById('text-input');
let taskList = [];
let mode='all';
let filterList = [];

input.addEventListener('change', (e) => {
    console.log('value:', input.value)
})

addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 0; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask() {
    let taskValue = taskInput.value;
    if (taskInput.value.trim() === "") {
    return alert("할 일을 입력해주세요");
    };
    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    render();
    taskInput.value = "";

}

function render() {
    //1. 내가 선택한 탭에 따라서
    let result = "";
    list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing") {
        list = taskList.filter((task) => !task.isComplete);
    } else if (mode === "done") {
        list = taskList.filter((task) => task.isComplete);
    //else if (mode === "ongoing" || mode === "done") {
        //list = filterList;
    }
    //2. 리스트를 달리 보여준다
    //all taskList
    //ongoing, done filterList
   // let resultHTML = "";
    for(let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            result += `<div class="task task-done id="${list[i].id}">
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                <button style="color: grey;" onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button style="color:red;" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        }else {
            result += `<div class="task id="${list[i].id}">
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                <button style="color: green;" onclick="toggleDone('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button style="color:red;" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id) {
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1);
            //break;
        }
    }
    filter();
}

function filter(e) {
    if (e) {
        //전체 리스트를 보여준다
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
            e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
    }
    filterList = [];
    if (mode === "ongoing") {
    //진행중인 아이템을 보여준다.
    //task.isComplete=false
        for(let i = 0; i< taskList.length; i++) {
            if (taskList[i].isComplete == false) {
            filterList.push(taskList[i])
            }
        }
    }else if (mode === "done") {
        //끝나는 케이스
        //task.isComplete=true
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i])
            }
        }
    }
    render();
}

function randomIDGenerate(){
    return `_` + Math.random().toString(36).substr(2, 9);
}


//<i class="fa-solid fa-rotate-left" style="color: grey;" onclick="toggleComplete('${list[i].id}')"></i>
//<i class="fa-solid fa-trash-can" style="color:red;" onclick="deleteTask('${list[i].id}')"></i>

//<i class="fa-solid fa-check" style="color: green;" onclick="toggleComplete('${taskList[i].id}')"></i>
//<i class="fa-solid fa-trash-can" style="color:red;" onclick="deleteTask('${taskList[i].id}')"></i>