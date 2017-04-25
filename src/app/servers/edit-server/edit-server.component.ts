import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.guard';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if(params['id']) {
        const id: number = +params['id'];
        this.server = this.serversService.getServer(id);
        if(this.server) {
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      this.allowEdit = queryParams['allowEdit'] && queryParams['allowEdit'] === '1' ? true : false;
    });

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.allowEdit && (this.server.name !== this.serverName || this.server.status != this.serverStatus) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    }

    return true;
  }

}
