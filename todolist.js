//先建立新增畫面

//抓到輸入在待辦事項input中的值
const txt=document.querySelector('.txt')

const list=document.querySelector('.list')

//點擊 .btn_add 時取得 txt.value
const btnAdd=document.querySelector('.btn_add')

let todoData=[]

btnAdd.addEventListener('click', (e)=>{
    //判斷輸入不能為空白
    if(txt.value.trim()==""){
        return;
    }

    let todo={
        content:txt.value,
        id:'',
        isCheck:''
    }


    //list.innerHTML=txt.value
    //得到的 txt.value要丟進 ul的li中
    /*要組的字串
    <li>
    <label class="checkbox" for="">
    <input type="checkbox" />
    <span>把冰箱發霉的檸檬拿去丟</span>
    </label>
    <a href="#" class="delete"></a>
    </li>
    */

    let str="";  //不能是const，要是let
    str+=`<li>
    <label class="checkbox" for="">
    <input type="checkbox" />
    <span>${txt.value}</span>
    </label>
    <a href="#" class="delete"></a>
    </li>`

    list.innerHTML=str
})




