import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Trainingday } from './trainingday.model';
import { TrainingdayService } from './trainingday.provider';

@IonicPage()
@Component({
    selector: 'page-trainingday-dialog',
    templateUrl: 'trainingday-dialog.html'
})
export class TrainingdayDialogPage {

    trainingday: Trainingday;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private trainingdayService: TrainingdayService) {
        this.trainingday = params.get('item');
        if (this.trainingday && this.trainingday.id) {
            this.trainingdayService.find(this.trainingday.id).subscribe(data => {
                this.trainingday = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.trainingday.id : null],
            description: [params.get('item') ? this.trainingday.description : '', ],
            date: [params.get('item') ? this.trainingday.date : '', ],
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
     * The user is done and wants to create the trainingday, so return it
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
