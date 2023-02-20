import { BaseCaseModel } from "@src/core/models/base";
import { SelectedProduct, Criteria } from "@src/core";

export class CalendlyEvent extends BaseCaseModel {
  id;
  name;
  startTime;
  uri;
  location;
}

export class CalendlyInvitee extends BaseCaseModel {
  id;
  email;
  firstName;
  lastName;
  rescheduleUrl;
  uri;
  uuid;
  event = new CalendlyEvent();
}

export class CustomerLead extends BaseCaseModel {
  urlToken;
  id;
  calendlyInvitee = new CalendlyInvitee();
  productCriteria = new Criteria();
  selectedProduct = new SelectedProduct();
}

export class Customer extends BaseCaseModel {
  id = null;
  firstName;
  lastName;
  email;
  phone;
  address;
  aptNumber = "";
  city = "";
  zipCode = "";
  gateCode = "";
  lead = new CustomerLead();

  static identityJSON(instance) {
    return {
      firstName: instance.firstName,
      lastName: instance.lastName,
      email: instance.email,
      phone: instance.phone,
      address: instance.address,
      aptNumber: instance.aptNumber,
      city: instance.city,
      zipCode: instance.zipCode,
      gateCode: instance.gateCode,
    };
  }
}
