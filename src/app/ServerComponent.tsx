import React from 'react'
import { createUserActionFromServerComponent } from './create-user-action'

const ServerComponent = async () => {
    return (
        // サーバーコンポーネントでは、formのactionにサーバーアクションを指定する
        // input属性をFormDataオブジェクトとしてサーバーアクションに渡せる
        <form action={createUserActionFromServerComponent}>
            <input className="border" type="text" name="name" />
            <input className="border" type="text" name="email" />
            <input className="border" type="text" name="password" />
            <button>送信</button>
        </form>
  )
}

export default ServerComponent