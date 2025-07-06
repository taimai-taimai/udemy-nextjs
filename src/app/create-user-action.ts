"use server"

import { z } from "zod"
import prisma from "../../lib/prisma"

const userSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(30),
    password: z.string().min(8).max(100),
})

type CreateUserData = z.infer<typeof userSchema>

export const createUser = async (data: CreateUserData) => {
    const validation = userSchema.safeParse(data)

    if (!validation.success) {
        return validation.error
    }

    const { name, email, password } = validation.data

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })
    return user 
}

export const createUserActionFromServerComponent = async (formData: FormData) => {
    const userData = Object.fromEntries(formData.entries())

    const validation = userSchema.safeParse(userData)

    if (!validation.success) {
        throw new Error(validation.error.message)
    }

    const { name, email, password } = validation.data 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })
}