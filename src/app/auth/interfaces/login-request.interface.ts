export interface LoginRequest {
  identityDocument: string;
  fullName:         string;
  lastName:         string;
  email:            string;
  passwordHash:     string;
}
