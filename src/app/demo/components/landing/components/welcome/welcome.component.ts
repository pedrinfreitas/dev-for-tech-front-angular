import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../../service/photo.service";

@Component({
  selector: 'landing-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    constructor(private photoService: PhotoService) { }

    images!: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    ngOnInit() {
        this.photoService.getImagesLandingPage().then(images => {
            this.images = images;
        });
    }

}
