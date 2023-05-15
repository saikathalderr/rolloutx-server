import Role from "@role";

const attributes = {
  ticket: "ticket",
  user: {
    admin: Role.ADMIN,
    developer: Role.DEVELOPER,
    productOwner: Role.PRODUCT_OWNER,
  },
};

export default attributes;
