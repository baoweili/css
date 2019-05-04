const itemNum = 10;
const showItem = 5;
let lastIndex = showItem + 1;
let ul = document.querySelector(".removeItem");
let frament = document.createDocumentFragment();
const project = new Array(itemNum).fill('').map((item, index) => ({
  content: `项目${index + 1}`,
  remove: false
}));

let showProject = [];
let rest = [];
if(project.length > showItem) {
  showProject = project.slice(0, lastIndex);
  rest = project.slice(lastIndex);
} else {
  showProject =[...project];
}

//创建dom元素
const createLi = (item, index, parent) => {
  let li = document.createElement("li");
  let spanText = document.createElement("span");
  let spanBtn = document.createElement("span");
  li.classList.add('item');
  li.setAttribute('data-index', index);
  spanText.innerText = item.content;
  spanBtn.innerText = '删除';
  spanBtn.classList.add('removeBtn');
  li.appendChild(spanText);
  li.appendChild(spanBtn);
  parent.appendChild(li);
}

showProject.forEach((item, index) => {
  createLi(item, index, frament);
});

ul.appendChild(frament);

//得到外链css的某一个属性值
const getCssStyle = (el, prop) => {
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}

ul.addEventListener('click', (e) => {
  const target = e.target;
  if(target.tagName === "SPAN" && target.innerText === "删除") {
    let parent = target.parentNode;
    parent.classList.add("remove");
    if(rest.length) {
      let newItem = rest.shift();
      createLi(newItem, lastIndex++, ul);
    }
    setTimeout(() => {
      ul.removeChild(parent);
    }, 1000);
  }
});
