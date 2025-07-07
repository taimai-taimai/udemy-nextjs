import prisma from "../../../../lib/prisma"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email().max(30),
  password: z.string().min(8).max(100),
})

export async function POST(request: Request) {
  const res = await request.json()

  const validation = userSchema.safeParse(res)

  if (!validation.success) {
    return Response.json({ error: validation.error.message }, { status: 400 })
  }

  const { name, email, password } = validation.data

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  return Response.json({ user })
}
