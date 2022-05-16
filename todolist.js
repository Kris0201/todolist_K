//先建立新增畫面

const txt=document.querySelector('.txt')
const list=document.querySelector('.list')
const btnAdd=document.querySelector('.btn_add')


let todoData=[]
//在dev tool頁面直接搜todoData，確認輸入的input資料有進到陣列中

//1. 新增
btnAdd.addEventListener('click', (e)=>{
    //判斷輸入不能為空白&清除空格
    if(txt.value.trim()==""){
        alert('請輸入內容')
        return;
    }

    let todo={
        content:txt.value,
        id:new Date().getTime(),  
        //時間戳：刪除、切換狀態

        isCheck:'' 
        //判別項目是否完成
    }
    todoData.unshift(todo)
    txt.value="";
    render(todoData);

})


//2. 渲染
function render(todoData){
    let str="";

    todoData.forEach((item)=>{
        str+=`<li data-id=${i.id}>
        <label class="checkbox" for="">
        <input type="checkbox" ${item.isCheck}/>
        <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>
        </li>`

    })
   
    list.innerHTML=str

}

// 3. tab切換(css樣式)
