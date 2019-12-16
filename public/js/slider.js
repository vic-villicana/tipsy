const slides = document.querySelectorAll(".slide"),
      next = document.querySelector("#next"),
      prev = document.querySelector("#prev");
const auto = false,
      intervalTime = 3000;
let slideInterval;

 const nextSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if(current.nextElementSibling){
    current.nextElementSibling.classList.add("current");    
  }else{
    slides[0].classList.add("current");
  }
    setTimeout(()=> current.classList.remove("current"));
 };

 const prevSlide = () =>{
   const current = document.querySelector(".current");
   current.classList.remove("current");
   if(current.previousElementSibling){
     current.previousElementSibling.classList.add("current");
   }else{
     slides[slides.length-1].classList.add("current");
   }
   setTimeout(()=>current.classList.remove("current"));
 }

next.addEventListener("click", (e)=>{
  nextSlide()
});

prev.addEventListener("click", (e)=>{
  prevSlide()
});