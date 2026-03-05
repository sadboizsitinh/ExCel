const keypad = document.querySelector(".keypad");
const dots = document.querySelectorAll(".dots span");
const errorMessage = document.querySelector(".error-message");
const heart = document.querySelector(".heart");

const CorrectPassword = "2811"; 

let input = ""; 

for (let i = 1; i <= 9; i++) {
     createKey(i); 
}

createKey(0); 

const del = document.createElement("div"); 

del.classList.add("key"); 

del.innerHTML = `
<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 4H8l-5 8 5 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
</svg>
`;

del.onclick = removeLast;

keypad.appendChild(del); 

function createKey (num) {
    const btn = document.createElement("div"); 
    btn.classList.add("key"); 
    btn.textContent = num; 
    btn.onclick = () => press(num, btn);
    keypad.appendChild(btn); 
}

function press (num, btn) {
    if (input.length >= 4) return; 

    input += num; 
    dots[input.length - 1].classList.add("filled"); 

    btn.classList.add("active"); 
    setTimeout(() => {
        btn.classList.remove("active");  
    }, 150);

    if (input.length === 4) {
        setTimeout(checkPassword, 300); 
    }
}

function removeLast() {
    if (input.length === 0) return; 
   
    dots[input.length - 1].classList.remove("filled"); 
    input = input.slice(0, -1);
}


function checkPassword () {
    if (input === CorrectPassword) {
        window.location.href = "home.html"; 
    } else {
        heart.textContent = "Chưa đúng rùi yêu dấu ơi, em thử ngày nào đó đặc biệt xiem ạa :>";
        heart.classList.add("error-text");
    
        

       setTimeout(() => {
            heart.textContent = "❤";
            heart.classList.remove("error-text");
            heart.style.color = "#ff3d7f";
        }, 2000);
    }

    input = ""; 
    dots.forEach(dot => dot.classList.remove("filled")); 
}
