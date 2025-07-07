"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { createUserAction, createUserResult } from "./create-user-action"

const userSchema = z.object({
    name: z.string().min(1, { message: "名前は1文字以上で入力してください" }).max(30, { message: "名前は30文字以内で入力してください" }),
    email: z.string().email({ message: "メールアドレスの形式が不正です" }).max(30, { message: "メールアドレスは30文字以内で入力してください" }),
    password: z.string().min(8, { message: "パスワードは8文字以上で入力してください" }).max(100, { message: "パスワードは100文字以内で入力してください" }),
})

type CreateUserData = z.infer<typeof userSchema>

export default function ClientComponent() {
  const [result, setResult] = useState<createUserResult | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(userSchema),
  })
  const onSubmit: SubmitHandler<CreateUserData> = async (data) =>{
    const res = await createUserAction(data)
    setResult(res)
  }


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* register your input into the hook by invoking the "register" function */}
        <input className="border" {...register("name")} />

        {/* errors will return when field validation fails  */}
        {errors.name != null && <span>{errors.name.message}</span>}
      </div>
      <div>
        <input className="border" {...register("email")} />
        {errors.email != null && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input className="border" {...register("password")} />
        {errors.password != null && <span>{errors.password.message}</span>}
      </div>
      {result != null && <p>{result.message}</p>}
      <button type="submit">送信</button>
    </form>
  )
}