import { AccessControl } from "accesscontrol";
import attributes from "@src/domains/attributes";
import { Role } from "@role";

const ac = new AccessControl();

// Users
ac.grant(Role.DEVELOPER)
  .readOwn(attributes.user.developer)
  .updateOwn(attributes.user.developer);

ac.grant(Role.PRODUCT_OWNER)
  .createAny(attributes.user.developer)
  .readAny(attributes.user.developer)
  .updateAny(attributes.user.developer)
  .deleteAny(attributes.user.developer)
  .readOwn(attributes.user.productOwner)
  .updateOwn(attributes.user.productOwner);

ac.grant(Role.ADMIN)
  .createAny(attributes.user.developer)
  .readAny(attributes.user.developer)
  .updateAny(attributes.user.developer)
  .deleteAny(attributes.user.developer)
  .createAny(attributes.user.productOwner)
  .readAny(attributes.user.productOwner)
  .updateAny(attributes.user.productOwner)
  .deleteAny(attributes.user.productOwner)
  .createAny(attributes.user.admin)
  .readAny(attributes.user.admin)
  .updateAny(attributes.user.admin)
  .deleteAny(attributes.user.admin);

// Tickets
ac.grant(Role.DEVELOPER)
  .createAny(attributes.ticket)
  .readAny(attributes.ticket)
  .updateAny(attributes.ticket);

ac.grant(Role.PRODUCT_OWNER)
  .createAny(attributes.ticket)
  .readAny(attributes.ticket)
  .updateAny(attributes.ticket)
  .deleteAny(attributes.ticket);

ac.grant(Role.ADMIN)
  .createAny(attributes.ticket)
  .readAny(attributes.ticket)
  .updateAny(attributes.ticket)
  .deleteAny(attributes.ticket);

export default ac;
