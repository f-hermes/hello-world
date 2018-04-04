import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Trainingday } from './trainingday.model';
import { TrainingdayService } from './trainingday.provider';

@IonicPage({
    segment: 'trainingday-detail/:id'
})
@Component({
    selector: 'page-trainingday-detail',
    templateUrl: 'trainingday-detail.html'
})
export class TrainingdayDetailPage {
    trainingday: Trainingday;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private trainingdayService: TrainingdayService, private toastCtrl: ToastController) {
        this.trainingday = new Trainingday();
        this.trainingday.id = params.get('id');
    }

    ionViewDidLoad() {
        this.trainingdayService.find(this.trainingday.id).subscribe(data => this.trainingday = data);
    }

    open(item: Trainingday) {
        let modal = this.modalCtrl.create('TrainingdayDialogPage', {item: item});
        modal.onDidDismiss(trainingday => {
            if (trainingday) {
                this.trainingdayService.update(trainingday).subscribe(data => {
                    this.trainingday = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Trainingday updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
