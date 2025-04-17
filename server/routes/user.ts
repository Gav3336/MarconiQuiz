import { Hono } from "hono";
import { validator } from 'hono/validator'

import * as userManager from "../handlers/postgressHandlers/userManager.ts";
import * as userValidation from "../utils/validators/userValidator.ts";

export const user = new Hono();

user.post('/signup', validator('form', (value, c) => {
      const parsed = userValidation.userDataSchema.safeParse(value)
      if (!parsed.success) {
        return c.text('Invalid data... '+ parsed.error.errors[0].message , 401)
      }
      return parsed.data
    }), (c) => {
      const body  = c.req.valid('form')

      userManager.signup(body)

      console.log(body)

      return c.json(
        {
            message: "User created successfully",
            data: body,
        },
        201
      )
    }
  )