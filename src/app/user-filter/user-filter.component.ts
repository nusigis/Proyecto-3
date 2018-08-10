import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  @Output() searchUser: EventEmitter<string> = new EventEmitter<string>();
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  search (event: MouseEvent, text: string) {
    event.preventDefault();
    this.userService.filterUsers(text);
  }

}
