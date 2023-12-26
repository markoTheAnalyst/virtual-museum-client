import { Component, OnInit } from '@angular/core';
import { MuseumService } from '../../services/museum.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private museumService: MuseumService) { }

  filteredMuseums: any;
  museums: any;

  ngOnInit(): void {

    this.museumService.getMuseums().subscribe(data => {
      this.museums = Object.values(data);
      this.filteredMuseums = Object.values(data);
      console.log(data);
    });

  }

  search(text: string) {

    this.filteredMuseums = this.museums.filter((museum: any) => {
      return museum.name?.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  }

}
