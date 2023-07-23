let _todoArray = [];
let _topPointer = -1;

$(document).ready(()=>{
    bindAllEvent();
})


function addToDoInArray(todo){
    if(!todo.trim()){
        return;
    }
    _todoArray.push(todo);
    _topPointer++;
   unmountList();
}

function deleteToDo(index){
    _todoArray.splice(index,1);
    _topPointer--;
    unmountList();
    reRenderList();
}

function editToDo(index){
    $(`#value_${index}`).addClass("sec-hide");
    $(`#edit_input_${index}`).removeClass("sec-hide");
    $(`#edit_input_${index}`).val(_todoArray[index]);
    $(`#edit_delete_btn_${index}`).addClass("sec-hide");
    $(`#save_btn_${index}`).removeClass("sec-hide");

}

function onClickSubmitTodo(){
    addToDoInArray($("#todo_input").val());
    $("#todo_input").val("");
    unmountList();
    reRenderList();
 }

 function onClickEditTodo(index){
    _todoArray[index] = $(`#edit_input_${index}`).val();
    unmountList();
    reRenderList();
}

function unmountList(){
    $("#todo_list_display").empty();
}

function reRenderList(){
    _todoArray.forEach((todo,index) => {
        $("#todo_list_display").append(`
        <div id="todo_${index}" class="todo-item">
        <div id="value_${index}" >
           ${todo}
        </div>
        <input id="edit_input_${index}" class="sec-hide" type="text" value="" placeholder="edit your task">
        <div id="edit_delete_btn_${index}" class="edit-delete-btn">
            <button id="edit_btn_${index}" class="edit-btn">edit</button>
            <button id="delete_btn_${index}" class="delete-btn">X</button>
        </div>
        <button id="save_btn_${index}" class="sec-hide">save</button>
   
        </div>`)
        $(`#delete_btn_${index}`).on("click", ()=>{
            deleteToDo(index);
        })
        $(`#edit_btn_${index}`).on("click", ()=>{
            editToDo(index);
        })
            
        $(`#save_btn_${index}`).on("click",()=>{
            onClickEditTodo()
        })        
        $(`#edit_input_${index}`).on("keypress",function(event){
            if(event.key === "Enter"){
                onClickEditTodo(index)
            }
        })
    })
}



function bindAllEvent(){
    $("#add_todo_btn").on("click", onClickSubmitTodo);
    $("#todo_input").on("keypress", function(event){
        if(event.key === "Enter"){
            onClickSubmitTodo();
        }
    })
    
}



