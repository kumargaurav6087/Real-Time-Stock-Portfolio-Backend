import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(250, { message: "Name must not be more than 250 characters." }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters." })
    .max(250, { message: "Email must not be more than 250 characters." }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters." })
    .max(20, { message: "Phone must not be more than 20 characters." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(1020, { message: "Password can't be greater than 1020 characters." }),
});

export default signupSchema;
