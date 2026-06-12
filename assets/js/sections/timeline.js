const sliders = document.querySelectorAll(".timeline-slider");

sliders.forEach((slider) => {

    const gallery = slider.querySelector(".timeline-gallery");

    const items = gallery.querySelectorAll("img, video");

    const prevBtn = slider.querySelector(".prev");

    const nextBtn = slider.querySelector(".next");

    /* Si no hay botones, no convertirlo en slider */

    if(!prevBtn || !nextBtn){
        return;
    }

    let currentIndex = 0;

    function showSlide(index){

        items.forEach((item)=>{

            item.classList.remove("active");

            if(item.tagName === "VIDEO"){
                item.pause();
            }

        });

        items[index].classList.add("active");

    }

    showSlide(currentIndex);

    nextBtn.addEventListener("click",()=>{

        currentIndex++;

        if(currentIndex >= items.length){
            currentIndex = 0;
        }

        showSlide(currentIndex);

    });

    prevBtn.addEventListener("click",()=>{

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = items.length - 1;
        }

        showSlide(currentIndex);

    });

});