import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public router: Router, public testService: TestService) {}
  public tellawUsers: any;
  //  public testserviceSting : any = {name:"hello",dept:"Soft",class:"jss2",email:"hello@jj"}
  public userIndex: any;
  public userArray: any;
  public userFirstName: any;
  public userAccountNumber: any;
  public totalAmount: any;
  public fundButtonClicked: any = 0;
  public fundAmount: any;
  public transferAmount: any;
  public transferButtonClicked: any = 0;
  public accountNumberEntered: any;
  public accountNumberTester: any;
  public accountNumberReport: any;
  public transferPartnerAccountIndex: any;
  public transferPartnerAccountName: any;
  public transferDescription: any;
  public userWallets: any;
  public mainAccountAmount: any;
  public referenceNumber: any;
  public fundAccountHistory: any;
  public userHistory: any;
  public reversedHistory: any;
  public reversedSlicedHistory: any=[];
  public requestsArray: any;
  public reversedRequestsArray: any;
  public reversedSlicedRequests: any;
  public accountNotFound:any
  public accountNumberEnteredLength:any
  public userPassword:any
  public passwordEntered:any
  public requestDetails:any
  public currentArrayOfUsers:any
  public transferHistoryReceiver:any
  public transferHistorySender:any
  ngOnInit(): void {
    this.tellawUsers = localStorage.localTellawUsers
      ? JSON.parse(localStorage.localTellawUsers)
      : [];
    this.userIndex = localStorage.getItem('signedInIndex');
    this.userArray = this.tellawUsers[this.userIndex];
    this.userFirstName = this.userArray.firstName;
    this.userAccountNumber = this.userArray.accountNumber;
    this.totalAmount = this.tellawUsers[this.userIndex].totalAmount;
    this.userWallets = this.tellawUsers[this.userIndex].wallet;
    this.mainAccountAmount = this.tellawUsers[this.userIndex].mainAccountAmount;
    this.userHistory = this.tellawUsers[this.userIndex].history;
    this.reversedHistory = this.userHistory.reverse();
    this.reversedSlicedHistory = this.reversedHistory.slice(0, 3);
    this.requestsArray = this.tellawUsers[this.userIndex].requests;
    this.reversedRequestsArray = this.requestsArray.reverse();
    this.reversedSlicedRequests = this.reversedRequestsArray.slice(0, 3);
    console.log(this.userWallets);
    this.tellawUsers=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.currentArrayOfUsers= this.tellawUsers.filter((val:any,i:any)=>i!=this.userIndex)
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    console.log(this.currentArrayOfUsers)
    this.userPassword=this.tellawUsers[this.userIndex].password
    // this.showservice();
  }
  // fService(){
  //   this.testService.setArray(this.testserviceSting)
  //   this.showservice();
  // }
  // showservice(){
  //   this.testService.load().subscribe(data => console.log(data));
  // }
  fundA() {
    console.log(`ready to fund`);
    // this.router.navigate(["dashboard/fund-account"])
  }
  transferA() {
    this.router.navigate(['/transfer']);
  }
  createW() {
    this.router.navigate(['/dashboard/create-wallet']);
  }
  // fundW(i:any){
  //   this.router.navigate([`/dashboard/fund-wallet/${i}`])
  // }
  // withdrawW(i:any){
  //   this.router.navigate([`/dashboard/withdraw-wallet/${i}`])
  // }
  // deleteW(i:any){
  //   this.router.navigate([`/dashboard/delete-wallet/${i}`])
  // }
  requestF() {
    this.router.navigate(['/payments']);
  }

  fundMe() {
    console.log(this.fundAmount);
    if (this.fundAmount) {
      //Initialise date and time display settings
      var myDate = new Date();
      var allTime = myDate.toLocaleTimeString();
      var allDate = myDate.toLocaleDateString();

      //Add money to the main account
      this.tellawUsers[this.userIndex].mainAccountAmount += parseFloat(
        this.fundAmount
      );
      //Add money to the total amount
      this.totalAmount += parseFloat(this.fundAmount);
      this.userArray.totalAmount = this.totalAmount;
      //Generate Reference number
      this.referenceNumber = Math.round(Math.random() * 10000000000000000);
      //Push to history
      this.fundAccountHistory = {
        nameOfReceiver: 'Raymond Bank',
        accountNumberOfReceiver: 'Debit Card Number',
        date: allDate,
        time: allTime,
        description: 'Visa Debit Card withdrawal from Raymond Bank',
        transferAmount: parseFloat(this.fundAmount),
        transactionType: 'credit',
        referenceNumber: this.referenceNumber,
      };
      this.tellawUsers[this.userIndex].history.push(this.fundAccountHistory);
      //push to local storage
      localStorage.setItem(
        'localTellawUsers',
        JSON.stringify(this.tellawUsers)
      );
      alert(`Account Funded Successfully`);
      this.ngOnInit();
      // this.router.navigate(["/dashboard"])
    } else {
      alert('Kindly Enter An Amount');
    }
  }
  routeToMessages() {
    this.router.navigate(['/messages']);
  }
  navigateToTransactions() {
    this.router.navigate(['/history']);
  }
  checkAccountNumber(){
    this.ngOnInit()
    this.accountNumberTester = this.tellawUsers.find((val:any,i:any)=> this.tellawUsers[i].accountNumber==this.accountNumberEntered)
    console.log( this.accountNumberTester)
    if(!this.accountNumberTester){
      console.log(`account does not exist`)
      this.transferPartnerAccountName=`Account Not Found`
    }
    else{
      console.log(`account exists`)
      this.transferPartnerAccountIndex=this.tellawUsers.indexOf(this.accountNumberTester)
          this.transferPartnerAccountName=this.tellawUsers[this.transferPartnerAccountIndex].firstName + " " + this.tellawUsers[this.transferPartnerAccountIndex].lastName
          console.log(this.transferPartnerAccountName)
    }
    
  }
  request(){
    if(this.userPassword==this.passwordEntered){
       //Initialise date and time display settings
        var myDate = new Date;
        var allTime = myDate.toLocaleTimeString()
        var allDate =  myDate.toLocaleDateString()
      //Prepare Object details to send to Array
      this.requestDetails = {
        nameOfRequester:this.tellawUsers[this.userIndex].firstName + ' ' + this.tellawUsers[this.userIndex].lastName,
        date:allDate,
        time:allTime,
        description:this.transferDescription,
        indexOfRequestSender:this.userIndex,
        amount:parseFloat(this.fundAmount)
      }
      this.tellawUsers[this.transferPartnerAccountIndex].requests.push(this.requestDetails)

      //Send Details to History
       //Generate Reference number
      //  this.referenceNumber = Math.round(Math.random()*10000000000000000)
       //For Sender
      //  this.transferHistorySender = {
      //    nameOfReceiver: this.transferPartnerAccountName,
      //    accountNumberOfReceiver:this.tellawUsers[this.transferPartnerAccountIndex].accountNumber,
      //    date:allDate,
      //    time:allTime,
      //    description:`Transfer to ${this.transferPartnerAccountName}`,
      //    transferAmount:this.transferAmount,
      //    transactionType:'debit',
      //    referenceNumber:this.referenceNumber
      //  }
      //  this.tellawUsers[this.userIndex].history.push(this.transferHistorySender)

       //For Receiver
      //  this.transferHistoryReceiver = {
      //    nameOfSender: this.userArray.firstName + " " +this.userArray.lastName,
      //    accountNumberOfSender:this.userAccountNumber,
      //    date:allDate,
      //    time:allTime,
      //    description:`Transfer from  ${this.userArray.firstName}`,
      //    transferAmount:this.transferAmount,
      //    transactionType:'credit',
      //    referenceNumber:this.referenceNumber
      //  }
      //  this.tellawUsers[this.transferPartnerAccountIndex].history.push(this.transferHistoryReceiver)
       console.log(this.tellawUsers)

      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      alert(`Request Sent`)
      console.log(this.tellawUsers)
      
    }
    
    
  }
  
}


