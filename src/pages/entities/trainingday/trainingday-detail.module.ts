import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingdayDetailPage } from './trainingday-detail';
import { TrainingdayService } from './trainingday.provider';

@NgModule({
    declarations: [
        TrainingdayDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TrainingdayDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TrainingdayDetailPage
    ],
    providers: [TrainingdayService]
})
export class TrainingdayDetailPageModule {
}
