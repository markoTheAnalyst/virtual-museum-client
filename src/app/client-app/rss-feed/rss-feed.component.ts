import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRssItem, NewsRss } from './news-rss';
import * as xml2js from "xml2js";

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})
export class RssFeedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  RssFeed: NewsRss | null = null;
  rssData : any;
  rssItems: Array<IRssItem> = [];
  //rssItems: Array<any> = [];

  ngOnInit(): void {



    this.http.get('https://cors-anywhere.herokuapp.com/https://www.huffpost.com/section/arts/feed',
    { observe: 'body', responseType: 'text'}).subscribe(data => {

      let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssFeed = result;
          this.rssItems = result.rss.channel[0].item;
        });

        console.log(this.rssItems);
     // let x = converter.xml2json(data);
      //this.rssData = x;
     // console.log(x);
    });
  }

}
