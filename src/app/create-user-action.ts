"use server"

import { z } from "zod"
import prisma from "../../lib/prisma"

export type createUserResult = {
  success: boolean
  message: string
}

const userSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email().max(30),
  password: z.string().min(8).max(100),
})

type CreateUserData = z.infer<typeof userSchema>

export const createUserAction = async (
  data: CreateUserData
): Promise<createUserResult> => {
  const validation = userSchema.safeParse(data)

  if (!validation.success) {
    console.log(validation.error)
    return {
      success: false,
      message: "バリデーションエラー",
    }
  }

  const { name, email, password } = validation.data

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return {
      success: true,
      message: "ユーザーを作成しました",
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "ユーザーの作成に失敗しました",
    }
  }
}

export const createUserActionFromServerComponent = async (
  formData: FormData
) => {
  const userData = Object.fromEntries(formData.entries())

  const validation = userSchema.safeParse(userData)

  if (!validation.success) {
    throw new Error(validation.error.message)
  }

  const { name, email, password } = validation.data
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}
