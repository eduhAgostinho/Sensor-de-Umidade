import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { RegistroService } from 'src/services/registro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'client';
  sub: Subscription;
  vapidPublic = 'BLxxlwet7f170fGgMz38wEzrO8cxgC-pWKYUSlILpk0tqOqNZ2Z9xki09Tx-TBmZuXOBq0omLrs38Ohhgvq0osc';

  constructor(private swPush: SwPush, private registroServ: RegistroService) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: this.vapidPublic
        })
        .then(subscription => {
          this.sub = this.registroServ.postSubscription(subscription).subscribe();
        })
        .catch(console.error);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
