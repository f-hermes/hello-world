import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Attendee } from './attendee.model';
import { AttendeeService } from './attendee.provider';

@IonicPage({
    segment: 'attendee-detail/:id'
})
@Component({
    selector: 'page-attendee-detail',
    templateUrl: 'attendee-detail.html'
})
export class AttendeeDetailPage {
    attendee: Attendee;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private attendeeService: AttendeeService, private toastCtrl: ToastController) {
        this.attendee = new Attendee();
        this.attendee.id = params.get('id');
    }

    ionViewDidLoad() {
        this.attendeeService.find(this.attendee.id).subscribe(data => this.attendee = data);
    }

    open(item: Attendee) {
        let modal = this.modalCtrl.create('AttendeeDialogPage', {item: item});
        modal.onDidDismiss(attendee => {
            if (attendee) {
                this.attendeeService.update(attendee).subscribe(data => {
                    this.attendee = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Attendee updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
