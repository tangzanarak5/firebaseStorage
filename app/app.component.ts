import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import * as camera from "nativescript-camera";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {

    public firebase = require("nativescript-plugin-firebase");

    tang = "tang" ;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.firebase.init({
            storageBucket: "gs://testtnsfirebase.appspot.com"
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

    tackPic () {
      var pic ;
        camera.requestPermissions();
        camera.takePicture()
        .then((imageAsset) => {
            console.log("Result is an image asset instance");
            imageAsset;
            pic = imageAsset ;
            console.log(pic.android);

            // init the file-system module
            var fs = require("file-system");

            var appPath = fs.knownFolders.currentApp().path;
            // determine the path to a file in the app/res folder
            var logoPath = appPath + "/res/telerik-logo.png";
            console.log('logopath: ' + logoPath);
  
            // this.firebase.uploadFile({
            //   remoteFullPath: 'uploads/images/telerik-logo-uploaded.png',
  
            //   localFile: fs.File.fromPath(logoPath),
            //   localFullPath: logoPath
  
            // }).then(
            //   (success) => {
            //     console.log(JSON.stringify(success));
            //   },
            //   (error) => {
            //       console.log("Error: " + error);
  
    // // grab a reference to the app folder
    // var appPath = fs.knownFolders.currentApp().path;
  
    // // determine the path to a file in the app/res folder
    // var logoPath = appPath + pic.android;
  
    // // now upload the file with either of the options below:
    this.firebase.uploadFile({
      // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
      //bucket: "gs://testtnsfirebase.appspot.com",
      // the full path of the file in your Firebase storage (folders will be created)
      remoteFullPath: 'uploads/images/telerik-logo-uploaded.jpg',
      // option 1: a file-system module File object
      localFile: fs.File.fromPath(logoPath),
      // option 2: a full file path (ignored if 'localFile' is set)
      localFullPath: logoPath,
      // get notified of file upload progress
      // onProgress: function(status) {
      //   console.log("Uploaded fraction: " + status.fractionCompleted);
      //   console.log("Percentage complete: " + status.percentageCompleted);
      // }
    }).then(
        function (uploadedFile) {
          console.log("File uploaded: " + JSON.stringify(uploadedFile));
        },
        function (error) {
          console.log("File upload error: " + error);
        }
    );
        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
      }
 }
