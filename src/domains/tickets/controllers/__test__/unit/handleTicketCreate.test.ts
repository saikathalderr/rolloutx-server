import { StatusCodes } from "http-status-codes";
import { handleTicketCreate } from "../../handleTicketCreate";
import db from "@db";
import { TICKET_CREATED } from "@src/constants/messages/const.messages";

jest.mock("@db", () => ({
  ticket: {
    create: jest.fn(),
  },
}));

describe("handleTicketCreate", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Ticket",
        content: "This is a test ticket.",
        status: "DONE",
      },
      user: {
        id: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new ticket and return a success response", async () => {
    const mockTicket = { id: 1, ...req.body, authorId: req.user.id };
    (db.ticket.create as any).mockResolvedValueOnce(mockTicket);

    await handleTicketCreate(req, res);

    expect(db.ticket.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      message: TICKET_CREATED,
      data: mockTicket,
    });
  });
  it("should return a 500 error if the ticket creation fails", async () => {
    (db.ticket.create as any).mockRejectedValueOnce(new Error("Test Error"));

    await handleTicketCreate(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      message: "Test Error",
    });
  });
});
