import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeeDialogPage } from './attendee-dialog';
import { AttendeeService } from './attendee.provider';

@NgModule({
    declarations: [
        AttendeeDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AttendeeDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AttendeeDialogPage
    ],
    providers: [
        AttendeeService
    ]
})
export class AttendeeDialogPageModule {
}
