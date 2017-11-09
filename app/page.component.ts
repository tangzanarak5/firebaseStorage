import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
    selector: "page",
    templateUrl: "page.component.html",
})

export class PageComponent implements OnInit {

    public firebase = require("nativescript-plugin-firebase");

    tang = "tang" ;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
          }).then(
            instance => {
              console.log("firebase.init done");
            },
            error => {
              console.log(`firebase.init error: ${error}`);
            }
          );
    }

    set () {

        this.firebase.push(
            '/registerUsers',
            {
                'first': 'Eddy',
                'last': 'Verbruggen',
                'birthYear': 1977,
                'isMale': true,
                'address': {
                  'street': 'foostreet',
                  'number': 123
                }
            }
        ).then(
            function (result) {
              console.log("created key: " + result.key);
            }
        );
    }

    show () {
        var onQueryEvent = function(result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            }
        };
    
        this.firebase.query(
            onQueryEvent,
            "/registerUsers",
            {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously.
                // Only when true, this function will return the data in the promise as well!
                singleEvent: true,
                // order by company.country
                orderBy: {
                    type: this.firebase.QueryOrderByType.CHILD,
                    value: 'since' // mandatory when type is 'child'
                },
                // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
                // use either a 'range'
                //range: {
                //    type: firebase.QueryRangeType.EQUAL_TO,
                //    value: 2000
                ///},
                // .. or 'chain' ranges like this:
                // ranges: [
                //   {
                //       type: this.firebase.QueryRangeType.START_AT,
                //       value: 1999
                //   },
                //   {
                //       type: this.firebase.QueryRangeType.END_AT,
                //       value: 2000
                //   }
                // ],
                // // only the first 2 matches
                // // (note that there's only 1 in this case anyway)
                // limit: {
                //     type: this.firebase.QueryLimitType.LAST,
                //     value: 2
                // }
            }
        );
    }
 }
