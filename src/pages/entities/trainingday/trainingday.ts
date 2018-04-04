import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Trainingday } from './trainingday.model';
import { TrainingdayService } from './trainingday.provider';

@IonicPage()
@Component({
    selector: 'page-trainingday',
    templateUrl: 'trainingday.html'
})
export class TrainingdayPage {
    trainingdays: Trainingday[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private trainingdayService: TrainingdayService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.trainingdays = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.trainingdayService.query().subscribe(
            (response) => {
                this.trainingdays = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Trainingday) {
        return item.id;
    }

    open(slidingItem: any, item: Trainingday) {
        let modal = this.modalCtrl.create('TrainingdayDialogPage', {item: item});
        modal.onDidDismiss(trainingday => {
            if (trainingday) {
                if (trainingday.id) {
                    this.trainingdayService.update(trainingday).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Trainingday updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.trainingdayService.create(trainingday).subscribe(data => {
                        this.trainingdays.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Trainingday added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(trainingday) {
        this.trainingdayService.delete(trainingday.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Trainingday deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(trainingday: Trainingday) {
        this.navCtrl.push('TrainingdayDetailPage', {id: trainingday.id});
    }
}
