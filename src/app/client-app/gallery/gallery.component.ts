import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MuseumService } from 'src/app/services/museum.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  show = true;
  slideIndex = 1;
  images: any;
  video = "https://www.youtube.com/embed/";
  url = "http://localhost:8080/download/";

  constructor(private route: ActivatedRoute, private museumService: MuseumService, private sanitized: DomSanitizer, private router: Router) {
    
    let endingTime = this.router.getCurrentNavigation()?.extras.state?.['endingTime'];
    let startingTime = this.router.getCurrentNavigation()?.extras.state?.['startingTime'];
    let currentDate = new Date();
    startingTime = new Date(startingTime);
   
    if (startingTime > currentDate || currentDate > endingTime) {
      this.show = false;
    }

    else{
      setTimeout(() => {
        router.navigate(['/visits']);
      }, endingTime.getTime() - currentDate.getTime());
    }
    

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.museumService.getImages(params.get('id')).subscribe((images: any) => {

        this.images = images;
        this.images = this.images.filter((extension: string) => !extension.endsWith('.txt'));

        this.museumService.getVideo(params.get('id')).subscribe((video: any) => {
          this.video += video.url; 
          this.showSlides(this.slideIndex);
        });
        
      });
      
    });

  }


videoURL() {
  return this.sanitized.bypassSecurityTrustResourceUrl(this.video);
}


plusSlides(n: number) {
  this.showSlides(this.slideIndex += n);
}

currentSlide(n: number) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n: number) {
  let i;
  let slides = Array.from(document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>);
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}    
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].style.display = "block";  
  dots[this.slideIndex-1].className += " active";
}

}
