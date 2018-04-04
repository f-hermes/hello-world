import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Attendee } from './attendee.model';
import { AttendeeService } from './attendee.provider';

@IonicPage()
@Component({
    selector: 'page-attendee',
    templateUrl: 'attendee.html'
})
export class AttendeePage {
    attendees: Attendee[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private attendeeService: AttendeeService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.attendees = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.attendeeService.query().subscribe(
            (response) => {
                this.attendees = response;
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

    trackId(index: number, item: Attendee) {
        return item.id;
    }

    open(slidingItem: any, item: Attendee) {
        let modal = this.modalCtrl.create('AttendeeDialogPage', {item: item});
        modal.onDidDismiss(attendee => {
            if (attendee) {
                if (attendee.id) {
                    this.attendeeService.update(attendee).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Attendee updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.attendeeService.create(attendee).subscribe(data => {
                        this.attendees.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Attendee added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(attendee) {
        this.attendeeService.delete(attendee.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Attendee deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(attendee: Attendee) {
        this.navCtrl.push('AttendeeDetailPage', {id: attendee.id});
    }
}
