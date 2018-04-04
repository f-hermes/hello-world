import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Attendee } from './attendee.model';
import { AttendeeService } from './attendee.provider';

@IonicPage()
@Component({
    selector: 'page-attendee-dialog',
    templateUrl: 'attendee-dialog.html'
})
export class AttendeeDialogPage {

    attendee: Attendee;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private attendeeService: AttendeeService) {
        this.attendee = params.get('item');
        if (this.attendee && this.attendee.id) {
            this.attendeeService.find(this.attendee.id).subscribe(data => {
                this.attendee = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.attendee.id : null],
            firstname: [params.get('item') ? this.attendee.firstname : '', ],
            lastname: [params.get('item') ? this.attendee.lastname : '', ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the attendee, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

}
