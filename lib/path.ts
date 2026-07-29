export const asset = (path: string) =>
  `${process.env.NODE_ENV === "production" ? "/deskscape" : ""}${path}`;