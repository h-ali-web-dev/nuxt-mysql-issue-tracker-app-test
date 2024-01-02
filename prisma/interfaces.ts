export interface UserInterface {
  name: String;
  email: String;
  image: String;
  id: String;
}

export interface IssueInterface {
  id: number;
  title: String;
  description: String;
  status: String;
  image: String;
  assignedToUserId: String;
}
