import { Subject } from 'rxjs';
import { User } from '../classes/user';

export class UserService {
    private searchString: string;
    private users: Array<User> = [
        {id: 1, name: 'Juan', lastName: 'Perez', adress: 'New York', age: 18},
        {id: 2, name: 'Paco', lastName: 'Gonzalez', adress: 'Texas', age: 22},
        {id: 3, name: 'Pedro', lastName: 'Rodriguez', adress: 'Ohio', age: 48}
    ];
    private users$ = new Subject<Array<User>>();

    delete(user: User) {
        /// TODO: Add functionality to delete the user
        this.users = this.users.filter(u => u.id !== user.id);
        this.users = [...this.users];
        if (this.searchString) {
          this.users = this.users.filter(u => u.name.includes(this.searchString));
        }
        // this.users$.next(this.getUsers());
        console.log(this.users);
        this.propagateChanges();
    }

    addUser(user: User) {
        // TODO: Add functionality to add the user
        this.users.push(user);
        this.propagateChanges();
    }

    user: User;
    editUser(user: User){
        // TODO: Add functionality to edit the user
        this.user = this.users.filter(u => u.id == user.id)[0];
        this.propagateChanges();
    }

    filterUsers(searchString: string) {
        this.searchString = searchString;
        this.propagateChanges();
    }

    getUsers() {
        let visibleUsers = this.users.map(u => ({...u}));
        if (this.searchString) {
            visibleUsers = visibleUsers.filter(u => u.name.toUpperCase().includes(this.searchString.toUpperCase()));
        }
        return visibleUsers;
    }

    subscribeToUsers() {
        return this.users$.asObservable();
    }
    private propagateChanges() {
        this.users$.next(this.getUsers());
    }
}
