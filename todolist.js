//先建立新增畫面

const txt=document.querySelector('.txt')
const list=document.querySelector('.list')
const btnAdd=document.querySelector('.btn_add')


let todoData=[]
//在dev tool頁面直接搜todoData，確認輸入的input資料有進到陣列中

// 1. 新增
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
    updateList()

})


// 2. 渲染
function render(todoData){
    let str="";

    todoData.forEach((item)=>{
        str+=`<li data-id=${item.id}>
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
//對 ul 做大範圍點擊監聽
const tab=document.querySelector('#tab')

let toggleStatus='all';
tab.addEventListener('click', function(e){
    toggleStatus=e.target.dataset.tab;
    //console.log('toggleStatus',toggleStatus)
   

    //點擊時先刪除所有 li 的 class
    let tabs=document.querySelectorAll('#tab li') //得到類陣列

    tabs.forEach((item)=>{
        item.classList.remove('active')
    })

    e.target.classList.add('active')
    updateList()
})


// 4. 刪除 & 切換 checked 狀態功能
//對 ul (.list) 做大範圍點擊監聽：打勾就 checked，按 x 就刪除
list.addEventListener('click',(e)=>{
    let id=e.target.closest('li').getAttribute('data-id')
    //為了點到整個 li，使用 .closest方法取得

    if(e.target.classList.value=="delete"){
        e.preventDefault();

        todoData=todoData.filter((i)=>{
            return i.id != id
            //i.id=id者會被刪除；即i.id!=id者會被保留

        })
    }else{
        //點擊 li 內 delete 以外的元素時，切換 checked 狀態功能：使勾選 / 取消勾選 checkbox 可以加上 / 移除 checked 屬性
        todoData.forEach((i,index)=>{
            if(i.id==id){
                if(todoData[index].isCheck=='checked'){
                    todoData[index].isCheck=''
                }else{
                    todoData[index].isCheck='checked'
                }
            }
        })
    }

    updateList()
   
})

// 5. 更新待辦清單：與 3 做整合

function updateList(){
    let showData=[]

    if (toggleStatus=='all'){
        //所有待辦事項
        showData=todoData;

    }else if(toggleStatus=='work'){
        //待完成項目
        showData=todoData.filter((i)=>{
            return i.isCheck==''
        })
    }else{
        //已完成項目
        showData=todoData.filter((i)=>{
            return i.isCheck=='checked'
        })
    }

    //寫入 x 個待完成項目邏輯
    const workNum=document.querySelector('#workNum')
    let todoLength=todoData.filter((i)=>{
        return i.isCheck==''
    })

    //待完成項目數值=陣列個數，用 .length 取值
    workNum.textContent=todoLength.length

    render(showData);
}

//初始
updateList()


// 6. 刪除已完成 todo 項目