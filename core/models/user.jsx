import { BaseCaseModel } from '@src/core/models/base'

export class User extends BaseCaseModel {
  avatar
  name = ""
  position
}

export class ProUser extends User {
  id = null
  email = null
  phone = null
  dateJoined
  firstName
  lastName
  timezone
  username

  static identityJSON(instance) {
    return {
      email: instance.email,
      phone: instance.phone,
      name: instance.name,
      firstName: instance.firstName,
      lastName: instance.lastName,
    }
  }
}
