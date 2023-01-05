export interface Contact {
  id: string;
  name: string;
  phone: number;
  email: string;
  image: string;
}

export interface ContactApi {
  name: string;
  phone: number;
  email: string;
  image: string;
}

export interface ContactsApiList {
  [id: string]: ContactApi;
}

interface FormMutation {
  name: string;
  phone: string;
  email: string;
  image: string;
}
