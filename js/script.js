//Want to put on the same line the elements
const bigElement=document.querySelectorAll(".main__element");
const item=document.querySelector(".main__element");
const smallCarousel=document.querySelector(".main__smallImages");
const mainCarousel=document.querySelector(".main__table");
const smallImage=document.querySelectorAll(".main__items");
const previous=document.getElementById("left");
const next=document.getElementById("right");
const first=document.querySelector(".main__element");


function converter(domElement){//function to convert dom element into real arrays
    const elementArray=[];
    for ( let element of domElement){
        elementArray.push(element);
    }
    return elementArray;
}
console.log(converter(smallImage));
console.log(converter(bigElement));
for (elementArray in converter(bigElement)){
    converter(bigElement)[elementArray].style.left=90*elementArray+"%";

}
// we create a function to help us change the table's color.


function tableTurn(target){
    const degre=(90*target);
    mainCarousel.style.transform="rotate(-"+degre+"deg)";
    return degre;
}
function changeTableColor(numberOfDegree){
    //here we are creating a changing color mechanism using the degrees of the turn of the doc.
    if (numberOfDegree==90){
        mainCarousel.style.borderColor="#363a17a1";
    }
    else if(numberOfDegree==180){
        mainCarousel.style.borderColor="#db933bb4";
    }
    else{
        mainCarousel.style.borderColor="#b7620195";
    }
}

function animateFoodText(index){
    const textSlide=document.querySelectorAll('.main__text');
    const currentTextSlide=document.querySelector('.toggle');
    currentTextSlide.classList.remove("toggle");
    converter(textSlide)[index].classList.add("toggle");//remove the current toggle to the current element and add it to the list of element in the array [textSlide]
  
}
function changeNotice(currentStars,index){
    const chiefWord=document.querySelectorAll(".main__infoBox");
    currentStars.classList.remove("current");
    converter(chiefWord)[index].classList.add("current");
    const star=document.querySelectorAll(".main__stars");
    converter(star)[index].style.transform="translateX("+20+"px)";

}

smallCarousel.addEventListener("click",(e)=>{
    const currentStars=document.querySelector(".current");
    const currentSmallImage=document.querySelector('.mark');
    const targetElement=e.target.closest(".main__items");
    const index=converter(smallImage).findIndex((element)=>element==targetElement);
    currentSmallImage.classList.remove('mark');
    targetElement.classList.add('mark');
    

    tableTurn(index);
    animateFoodText(index);
    changeTableColor(tableTurn(index));// nous appellons la function tableTurn dans changeTableColor car elle retourne le degree qui est notre parametre.
    changeNotice(currentStars,index);
    
   
});


next.addEventListener("click",()=>{
    const currentSmallImage=document.querySelector('.mark');
    const currentStars=document.querySelector(".current");
    const singleElement=document.querySelector(".present");
    let  nextSingleElement=singleElement.nextElementSibling;
    let index=0;// here we are initializing the index to zero 
    if (nextSingleElement==null){// here we are creating a mechanism to help us when we click to the next buttton when we are at the end of our carousel to return to the begining of the line
        index=converter(bigElement).findIndex((element)=>element==first);
        first.classList.add("present");
        console.log(index);
    }
    else{

        index=converter(bigElement).findIndex((element)=>element==nextSingleElement);
        singleElement.classList.remove("present");
        nextSingleElement.classList.add("present");
    }
  
    currentSmallImage.classList.remove('mark');
    smallCarousel.classList.add('mark');
    animateFoodText(index);//calling the function animateFoodText
    changeTableColor(tableTurn(index));// calling the function changeTableColor
    changeNotice(currentStars,index);// calling the function changeNotice.


});
previous.addEventListener("click",()=>{
    const currentStars=document.querySelector(".current");
    const singleElement=document.querySelector(".present");
    const previousSingleElement=singleElement.previousElementSibling;
    let index=0;
    if (previousSingleElement==null){// here we are creating a mechanism to help us when we click to the next buttton when we are at the end of our carousel to return to the begining of the line
        index=converter(bigElement).findIndex((element)=> element===converter(bigElement)[converter(bigElement).length-1]);
        console.log(index);

        //console.log(length-1);
        //console.log(converter(bigElement)[length-1]);
        //index=length-1;
    }
    else{

        index=converter(bigElement).findIndex((element)=>element==previousSingleElement);
        singleElement.classList.remove("present");
        previousSingleElement.classList.add("present");
    }
    animateFoodText(index);
    changeTableColor(tableTurn(index));
    changeNotice(currentStars,index);

});


