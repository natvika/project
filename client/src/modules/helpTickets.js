import { inject } from 'aurelia-framework';
import { HelpTicket } from '../resources/data/help-ticket-object'

@inject(HelpTicket)
export class HelpTickets {
    constructor(helpTicket) {
        this.helpTickets = helpTicket;
        this.showHelpTicketEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }
    
    async activate() {
        await this.helpTickets.getHelpTicket(this.userObj);
    }

    async getHelpTickets() {
        await this.helpTickets.getHelpTicket(this.userObj);
    }

    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personId: this.userObj._id,
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };

        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        this.showEditForm();
    }

    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    }

    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

}