import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomepageComponent {

  constructor(config: NgbCarouselConfig) {
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "../../assets/images/home1.jpg"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "../../assets/images/home2.jpg"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "../../assets/images/home3.jpg"}
  ];
}
