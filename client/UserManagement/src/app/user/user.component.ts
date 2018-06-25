import { Component, Input, ViewChild, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { IUser } from "../model/user";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dbop } from "../shared/dbop.enum";
import { UserService } from "../service/user.service";
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  @ViewChild('content')
      modal: BsModalComponent;
      users: IUser[];
      user: IUser;
      msg: string;
      indLoading: boolean = false;
      userFrm: FormGroup;
      dbops: Dbop;
      modalTitle: string;
      modalBtnTitle: string;
      active: boolean = false;
      closeResult: string;
      modalReference: NgbModalRef;

      constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private modalService: NgbModal,
        public _authService:AuthService
      ) {
        this.createForm();
      }

      createForm() {
        this.userFrm = this.fb.group({
          _id:  [''],
          FirstName:  ['',Validators.required],
          LastName:  [''],
          Email:  ['',Validators.email],
          Gender:  ['',Validators.required],
          DOB:  [''],
          City:  [''],
          State:  [''],
          Zip:  ['',Validators.required],
          Country: ['']
        });
      }

      ngAfterViewInit () {
      }

      ngOnInit(): void {
          this.createForm();
          this.LoadUsers();
      }

      open(content) {
        console.log(this.modalReference);
        console.log(this.userFrm.value);
        this.active = true;
        this.dbops = Dbop.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modalReference = this.modalService.open(content);
        console.log(this.modalReference);
        this.modalReference.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      LoadUsers(): void {
          this.indLoading = true;
          this._userService.get()
              .subscribe(users => { this.users = users; this.indLoading = false; },
              error => this.msg = <any>error);
      }

      addUser() {
        console.log(this);
        console.log(this.modal);
        this.active = true;
        this.dbops = Dbop.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open('lg');
      }

      editUser(id: string, content) {
        this.active = true;
          this.dbops = Dbop.update;
          this.SetControlsState(true);
          this.modalTitle = "Edit User";
          this.modalBtnTitle = "Update";
          this.user = this.users.filter(x => x._id == id)[0];
          this.userFrm.setValue(this.user);
          this.modalReference = this.modalService.open(content);
      }

      deleteUser(id: string, content) {
        this.active = true;
          this.dbops = Dbop.delete;
          this.SetControlsState(false);
          this.modalTitle = "Confirm to Delete?";
          this.modalBtnTitle = "Delete";
          this.user = this.users.filter(x => x._id == id)[0];
          this.userFrm.setValue(this.user);
          this.modalReference = this.modalService.open(content);
      }

      onSubmit(formData: any) {

          this.msg = "";

          switch (this.dbops) {
              case Dbop.create:
                  this._userService.post(formData.value).subscribe(
                      data => {
                        if (data._id != "") //Success
                        {
                        this.msg = "Data successfully added.";
                        this.LoadUsers();
                        }
                        else
                        {
                          this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        this.modalReference.close(this.userFrm.value);
                      },
                      error => {
                        this.msg = error;
                      }
                    );
                  break;
              case Dbop.update:
              // console.log(formData.value._id);
              // console.log(formData.value);
                  this._userService.put(formData.value._id, formData.value).subscribe(
                      data => {
                        if (data._id != "") //Success
                          {
                              this.msg = "Data successfully updated.";
                              this.LoadUsers();
                          }
                          else {
                              this.msg = "There is some issue in saving records, please contact to system administrator!"
                          }
                          this.modalReference.close(this.userFrm.value);
                      },
                      error => {
                          this.msg = error;
                      }
                  );
                  break;
              case Dbop.delete:
                  this._userService.delete(formData.value._id).subscribe(
                      data => {
                        if (data._id != "") //Success
                          {
                              this.msg = "Data successfully deleted.";
                              this.LoadUsers();
                          }
                          else {
                              this.msg = "There is some issue in saving records, please contact to system administrator!"
                          }
                          this.modalReference.close(this.userFrm.value);
                      },
                      error => {
                          this.msg = error;
                      }
                  );
                  break;

          }
      }

      SetControlsState(isEnable: boolean)
      {
          isEnable ? this.userFrm.enable() : this.userFrm.disable();
      }
  }
