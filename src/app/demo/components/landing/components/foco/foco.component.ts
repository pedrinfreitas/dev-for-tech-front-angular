import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../../service/photo.service";

@Component({
  selector: 'landing-foco',
  templateUrl: './foco.component.html',
  styleUrls: ['./foco.component.scss']
})
export class FocoComponent implements OnInit {

    constructor(private photoService: PhotoService) { }

    images!: any[];

    ngOnInit() {
        this.photoService.getImagesGalleriaPhotos().then(images => {
            console.log(images)
            this.images = images;
        });
    }

}
