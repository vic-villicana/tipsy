

const navSlide = () =>{
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');

    navLinks.forEach((Links, index)=>{
      if(Links.style.animation){
        Links.style.animation = ""
      }else{
        Links.style.animation = `navLinkFade 0.4s ease forwards ${index / 7+2}s `;
      }      
    });
    burger.classList.toggle("toggle")
  });

  
}
navSlide();