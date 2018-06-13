import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car/car';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public car:Car;
  public images:Array<any>=[];
  public showHistory:boolean=false;
  public showImpact:boolean=false;
  public carData: FormGroup;
  public errors: Array<any> = [];
  public errorMessage: string;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public carProvider:CarProvider,
    private formBuilder: FormBuilder) {
      this.carData=this.formBuilder.group({
        vin:[],
        make:[],
        model:[],
        year:[]
      });
  }

  response(response: any): void{
    if(response.success === false){
      console.log(response);
      this.errors = response.error.errors;
      this.errorMessage = response.error.message;
    }
    if(response.success === true){
      console.log('all good!');
      //this.navCtrl.push(UserPage, {id: response._id});
    }
  }

  public createCar(): void{
    this.carData.value.images=this.images;
    console.log(this.carData);
    this.carProvider.createCar(this.carData.value).subscribe(
      (response:any)=>{
        this.response(response);
      }
    );
  }
  takePicture():void{

    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.push(base64Image);

     }, (err) => {
      // Handle error
     });
  }
  private getCar(vin: string): void{
    this.carProvider.getCar(vin).subscribe(
      (response:any)=>{
        console.log(response);
        this.car = response.car;
      }
    );

  }
  submitVin(vin:string):void{
    this.getCar(vin);
  }
  getReport():void{

    this.showHistory=true;
    this.showImpact=false;
  }
  reportImpact():void{
    this.showImpact=true;
    this.showHistory=false;
  }
}
