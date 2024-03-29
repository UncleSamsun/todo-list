//값을 입력
//+ 버튼 클릭 시 할일 추가
//delete 버튼 클릭 시 할일 제거
//check 버튼 클릭 시 할일 이 끝나면서 취소선
//진행중 / 끝남 탭을 누르면 밑줄 이동
//전체탭은 전체 아이템, 진행중 탭은 진행중 아이템, 끝남 탭은 끝남 아이템만

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = "all";

tabs.forEach(menu=>menu.addEventListener("click", function(event){underLineIndicator(event)}));

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

addButton.addEventListener("click", addTask);

function addTask() {

    if(taskInput.value == "")
    {
        alert("내용을 입력해주세요!");
        return 0;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value, 
        isComplete: false
    }
    taskList.push(task);
    render();

    taskInput.value = "";
}

function render() {
    let resultHTML = '';
    let list = [];

    if(mode === "all")
    {
        list = taskList;
    }
    else if((mode === "ongoing") || (mode === "done"))
    {
        list = filterList;
    }

    for(let i = 0; i<list.length; i++)
    {
        if(list[i].isComplete == true)
        {
            resultHTML += `<div class="task-list task-list-done">
            <div>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked="checked" onclick="toggleComplete('${list[i].id}')"/>
                <span class="task-done">${list[i].taskContent}</span>
            </div>
            <div>
                <button type="button" class="btn-close shadow-none" aria-label="Close" onclick="taskDelete('${list[i].id}')"></button>
            </div>
            </div>`;
        }
        else{
            resultHTML += `<div class="task-list">
            <div>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="toggleComplete('${list[i].id}')"/>
                <span>${list[i].taskContent}</span>
            </div>
            <div>
                <button type="button" class="btn-close shadow-none" aria-label="Close" onclick="taskDelete('${list[i].id}')"></button>
            </div>
            </div>`;
        }
    }

    // <button class="check-button rounded" onclick="toggleComplete('${list[i].id}')"> Check </button>

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:", id);

    for(let i = 0; i < taskList.length; i++)
    {
        if(taskList[i].id == id)
        {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function taskDelete(id) {
    for(let i = 0; i < taskList.length; i++)
    {
        if(taskList[i].id == id)
        {
            taskList.splice(i, 1);
            break;
        }
    }

    if((mode === "ongoing") || (mode === "done"))
    {
        for(let i = 0; i < filterList.length; i++)
        {
            if(filterList[i].id == id)
            {
                filterList.splice(i, 1);
                break;
            }
        }
    }

    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function filter(event) {
    mode = event.target.id;
    filterList = [];

    if(mode === "all")
    {
        render();
    }
    else if(mode === "ongoing")
    {
        for(let i = 0; i < taskList.length; i++)
        {
            if(taskList[i].isComplete === false)
            {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    else if(mode === "done")
    {
        for(let i = 0; i < taskList.length; i++)
        {
            if(taskList[i].isComplete === true)
            {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function underLineIndicator(event) {
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + -2 + "px";
}

function enterkey() {
	if (window.event.keyCode == 13) {
    	// 엔터키가 눌렸을 때
        addTask();
    }
}