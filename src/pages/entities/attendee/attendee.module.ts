import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeePage } from './attendee';
import { AttendeeService } from './attendee.provider';

@NgModule({
    declarations: [
        AttendeePage
    ],
    imports: [
        IonicPageModule.forChild(AttendeePage),
        TranslateModule.forChild()
    ],
    exports: [
        AttendeePage
    ],
    providers: [AttendeeService]
})
export class AttendeePageModule {
}
